import { Service, Inject, Container } from "typedi";
import moment from "moment";
import axios from "axios";
import config from "../config";
import xml2js from "xml2js";
import SyncService from "../services/syncService.service";
import e from "express";
@Service()
export default class SyncBookingController {
  constructor(@Inject("logger") private logger) {}

  public async syncBooking(fromDate: string, toDate: string): Promise<any> {
    try {
      //step 1: Break the date range into 2-day chunks
      const chunks = await this.breakIntoChunks(fromDate, toDate);

      // step 2: Process each chunk sequentially with delay
      setImmediate(async () => {
        try {
          for (let i = 0; i < chunks.length; i++) {
            await this.processChunk(chunks[i]);
            if (i < chunks.length - 1) {
              await this.sleep(20000);
            }
          }
          console.log(`Completed sync from ${fromDate} to ${toDate}`);
        } catch (err) {
          this.logger?.error?.("Error in setImmediate syncBooking:", err);
        }
      });
      return chunks.length;
    } catch (e) {
      this.logger?.error?.("Error in syncBooking:", e);
      throw e;
    }
  }

  /**
   * Breaks date range into 2-day chunks
   * @param {string} fromDate - Start date in YYYY-MM-DD format
   * @param {string} toDate - End date in YYYY-MM-DD format
   * @returns {Array} - Array of date range objects with start and end dates
   */
  public async breakIntoChunks(fromDate: string, toDate: string) {
    const chunks = [];
    const start = moment(fromDate);
    const end = moment(toDate);

    let chunkStart = moment(start);

    while (chunkStart.isSameOrBefore(end)) {
      // Always make chunkEnd = chunkStart + 1 day (2-day chunk)
      let chunkEnd = moment(chunkStart).add(1, "days");

      chunks.push({
        start: chunkStart.format("YYYY-MM-DD"),
        end: chunkEnd.format("YYYY-MM-DD"),
      });

      // Move to the next chunk (skip 2 days ahead)
      chunkStart = moment(chunkEnd).add(1, "days");
    }

    return chunks;
  }

  public async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async processChunk(
    chunk: { start: string; end: string },
    type?: string,
  ) {
    const syncServiceInstance = Container.get(SyncService);
    const startTime = Date.now();
    const xmlRequest = await this.createXmlRequest(chunk.start, chunk.end);
    try {
      console.log(`Processing chunk: ${chunk.start} to ${chunk.end}`);
      const response = await axios.post(config.bookings.syncUrl, xmlRequest, {
        headers: {
          "Content-Type": "application/xml",
        },
      });
      const syncData = {
        fromDate: moment(chunk.start).format("YYYY-MM-DD"),
        toDate: moment(chunk.end).format("YYYY-MM-DD"),
        statusCode: 0,
        message: "Success",
        duration: 0,
        reservationsCount: 0,
        cancellationsCount: 0,
        adaptionDate: moment().format("YYYY-MM-DD"),
      };
      if (response?.data) {
        // Parse XML to JSON
        const parser = new xml2js.Parser({ explicitArray: false });
        const jsonData = await parser.parseStringPromise(response.data);
        // Handle the parsed data as needed
        if (jsonData?.RES_Response?.Errors?.ErrorCode === "0") {
          console.log(
            `Sync successful for chunk: ${chunk.start} to ${chunk.end}`,
          );
          // Save the parsed data
          const { reservationsCount, cancellationsCount } =
            await this.saveSyncData(jsonData);

          const duration = Date.now() - startTime;
          syncData.duration = duration;
          syncData.reservationsCount = reservationsCount;
          syncData.cancellationsCount = cancellationsCount;
        } else if (jsonData?.RES_Response?.Errors?.ErrorCode !== "0") {
          const duration = Date.now() - startTime;
          syncData.duration = duration;
          syncData.statusCode =
            jsonData?.RES_Response?.Errors?.ErrorCode || 400;
          syncData.message =
            jsonData?.RES_Response?.Errors?.ErrorMessage || "Bad Request";
        }
        //store data on syncLogs
      } else {
        //getting issue with response
        const duration = Date.now() - startTime;
        syncData.duration = duration;
        syncData.statusCode = 400;
        syncData.message = "Bad Request";
      }
      //create sync Log for manual sync
      if (!type) await syncServiceInstance.createSyncLog(syncData);
    } catch (error) {
      this.logger?.error?.(
        `Error processing chunk: ${chunk.start} to ${chunk.end}`,
        error,
      );
    }
  }

  public async createXmlRequest(fromDate, toDate) {
    return `
    <RES_Request>
      <Request_Type>Booking</Request_Type>
      <Authentication>
        <HotelCode>${config.bookings.hotelCode}</HotelCode>
        <AuthCode>${config.bookings.authCode}</AuthCode>
      </Authentication>
      <FromDate>${fromDate}</FromDate>
      <ToDate>${toDate}</ToDate>
    </RES_Request>
  `.trim();
  }

  public async saveSyncData(data) {
    let reservationsCount = 0;
    let cancellationsCount = 0;
    try {
      const syncServiceInstance = Container.get(SyncService);
      // Extract reservations from the response
      const reservations = data.RES_Response?.Reservations?.Reservation || [];
      const reservationArray = Array.isArray(reservations)
        ? reservations
        : [reservations].filter(Boolean);

      // Save each reservation
      for (const reservation of reservationArray) {
        //check if reservationId is present
        if (reservation?.BookByInfo?.UniqueID) {
          let body = reservation.BookByInfo;
          const reservationId = reservation.BookByInfo.UniqueID;
          const { existingReservation } =
            await syncServiceInstance.checkReservation({
              UniqueID: reservationId,
              entryStatus: "Primary",
            });
          if (existingReservation) {
            console.log(`Reservation with ID ${reservationId} already exists.`);
            // push entry on db with status duplicate
            body.entryStatus = "Secondary";
            body.referenceId = existingReservation._id;
            await syncServiceInstance.createReservation(body);
          } else {
            await syncServiceInstance.createReservation(body);
          }
        }
        reservationsCount++;
      }

      // Extract cancellations from the response
      const cancellations =
        data.RES_Response?.Reservations?.CancelReservation || [];
      const cancellationArray = Array.isArray(cancellations)
        ? cancellations
        : [cancellations].filter(Boolean);

      for (const cancellation of cancellationArray) {
        if (cancellation?.UniqueID) {
          //create new entry
          let body = cancellation;
          const reservationId = cancellation.UniqueID;
          const { existingCancellation } =
            await syncServiceInstance.checkCancellation({
              UniqueID: reservationId,
              entryStatus: "Primary",
            });
          if (existingCancellation) {
            console.log(
              `Cancellation with ID ${reservationId} already exists.`,
            );
            // push entry on db with status duplicate
            body.entryStatus = "Secondary";
            body.referenceId = existingCancellation._id;
            await syncServiceInstance.createCancellation(body);
          } else {
            await syncServiceInstance.createCancellation(body);
          }
        }
        cancellationsCount++;
      }

      return { reservationsCount, cancellationsCount };
    } catch (error) {
      this.logger?.error?.("Error in saveSyncData:", error);
      // Optionally: return default counts or throw
      return { reservationsCount, cancellationsCount };
    }
  }
}
