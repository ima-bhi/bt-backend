import { Service, Inject, Container } from "typedi";
import moment from "moment";
import axios from "axios";
import config from "../config";
import xml2js from "xml2js";
@Service()
export default class SyncBookingController {
  constructor(@Inject("logger") private logger) {}

  public async syncBooking(fromDate: string, toDate: string): Promise<any> {
    try {
      //step 1: Break the date range into 2-day chunks
      const chunks = await this.breakIntoChunks(fromDate, toDate);

      // step 2: Process each chunk sequentially with delay
      setImmediate(async () => {
        for (let i = 0; i < chunks.length; i++) {
          await this.processChunk(chunks[i]);
          if (i < chunks.length - 1) {
            await this.sleep(20000);
          }
        }
        console.log(`Completed sync from ${fromDate} to ${toDate}`);
      });
      return chunks.length;
    } catch (e) {
      // this.logger.error(e);
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

  public async processChunk(chunk: { start: string; end: string }) {
    const startTime = Date.now();
    const xmlRequest = await this.createXmlRequest(chunk.start, chunk.end);
    try {
      console.log(
        `Processing chunk: ${chunk.start} to ${chunk.end}`,
        config.bookings.syncUrl,
      );
      const response = await axios.post(config.bookings.syncUrl, xmlRequest, {
        headers: {
          "Content-Type": "application/xml",
        },
      });
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
          await this.saveSyncData(jsonData);
        }
      }
    } catch (error) {
      console.error(
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
      // Extract reservations from the response
      const reservations = data.RES_Response?.Reservations?.Reservation || [];
      const reservationArray = Array.isArray(reservations)
        ? reservations
        : [reservations].filter(Boolean);
      console.log(JSON.stringify(reservationArray[0], null, 2));
    } catch (error) {}
  }
}
