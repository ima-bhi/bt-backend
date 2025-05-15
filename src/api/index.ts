import { Router } from "express";
import syncBookingRoute from "./routes/syncBooking.route";

export default () => {
  const app = Router();
  syncBookingRoute(app);
  return app;
};
