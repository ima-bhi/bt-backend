import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import moment from "moment";
import SyncBookingController from "../../controllers/syncBooking.controller";
const route = Router();

export default (app: Router) => {
  app.use("/", route);

  route.post(
    "/bookings/sync",
    //@ts-ignore
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get("logger");
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      logger.debug("Calling /bookings/sync endpoint with body: %o", req.body);
      try {
        const syncBookingControllerInstance = Container.get(
          SyncBookingController,
        );
        // Validate required parameters
        const { fromDate, toDate } = req.body;
        if (!fromDate || !toDate) {
          return res.status(400).json({
            success: false,
            message: "Both fromDate and toDate are required",
          });
        }
        //validate fromdate is smaller than todate
        if (moment(fromDate).isSameOrAfter(moment(toDate))) {
          return res.status(400).json({
            success: false,
            message: "fromDate should be smaller than toDate",
          });
        }

        // Validate the gap between fromDate and toDate is not more than 30 days
        if (moment(toDate).diff(moment(fromDate), "days") > 30) {
          return res.status(400).json({
            success: false,
            message:
              "The gap between fromDate and toDate should not be more than 30 days",
          });
        }
        //syncBooking Controller
        await syncBookingControllerInstance
          .syncBooking(fromDate, toDate)
          .then((results) => {
            console.log(`Sync completed with ${results} chunks processed`);
          })
          .catch((error) => {
            console.error("Sync error:", error);
          });

        // Return immediate response to client
        return res.status(202).json({
          success: true,
          message: "Sync process started successfully",
          fromDate,
          toDate,
        });
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        logger.error("Error: %o", e);
        return next(e);
      }
    },
  );
};
