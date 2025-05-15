import mongoose from "mongoose";
export interface ICancellation {
  _id: mongoose.Types.ObjectId;
  LocationId: string;
  UniqueID: string;
  Status: string;
  Canceldatetime: string;
  Remark: string;
  VoucherNo: string;
  entryStatus: string;
  referenceId: string;
}
