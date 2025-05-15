import mongoose from "mongoose";
import { ISyncLog } from "../interfaces/ISyncLogs.interface";

const SyncLogSchema = new mongoose.Schema(
  {
    fromDate: {
      type: String,
      required: true,
    },
    toDate: {
      type: String,
      required: true,
    },
    statusCode: {
      type: Number,
      default: 0,
    },
    message: {
      type: String,
      default: "Success",
    },
    duration: {
      type: Number,
      default: 0,
    },
    reservationsCount: {
      type: Number,
      default: 0,
    },
    cancellationsCount: {
      type: Number,
      default: 0,
    },
    adaptionDate: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ISyncLog & mongoose.Document>(
  "syncLogs",
  SyncLogSchema,
);
