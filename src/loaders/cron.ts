import cron from "node-cron";
import Container from "typedi";
import SyncBookingController from "../controllers/syncBooking.controller";
import SyncService from "../services/syncService.service";
import moment from "moment";
import config from "../config";
export default async () => {
  const syncServiceInstance = Container.get(SyncService);
  const syncBookingControllerInstance = Container.get(SyncBookingController);
  const isCron = config.isCron;
  if (isCron === "true") {
    cron.schedule(
      "*/30 * * * *", // every 30 minutes
      async () => {
        //find all syncLogs for last 2 days
        const { syncLogs } = await syncServiceInstance.findLogs({
          adaptionDate: {
            $gte: moment().subtract(2, "days").format("YYYY-MM-DD"),
            $lte: moment().format("YYYY-MM-DD"),
          },
        });

        if (syncLogs.length > 0) {
          for (let i = 0; i < syncLogs.length; i++) {
            const chunk = {
              start: moment(syncLogs[i].fromDate).format("YYYY-MM-DD"),
              end: moment(syncLogs[i].toDate).format("YYYY-MM-DD"),
            };
            await syncBookingControllerInstance.processChunk(chunk, "cron");
            if (i < syncLogs.length - 1) {
              await syncBookingControllerInstance.sleep(20000);
            }
          }
        }
      },
      {
        scheduled: true,
        timezone: "Asia/Kolkata",
      } as any,
    );
  }
};
