import mongoose from "mongoose";
import { ICancellation } from "../interfaces/ICancellation.interface";

const Cancellation = new mongoose.Schema(
  {
    LocationId: {
      type: String,
      default: null,
    },
    UniqueID: {
      type: String,
      default: null,
    },
    Status: {
      type: String,
      default: null,
    },
    Canceldatetime: {
      type: String,
      default: null,
    },
    Remark: {
      type: String,
      default: null,
    },
    VoucherNo: {
      type: String,
      default: null,
    },
    entryStatus: {
      type: String,
      enum: ["Primary", "Secondary"],
      default: "Primary",
    },
    referenceId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ICancellation & mongoose.Document>(
  "Cancellation",
  Cancellation,
);
