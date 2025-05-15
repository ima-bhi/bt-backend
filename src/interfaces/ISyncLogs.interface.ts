import mongoose from "mongoose";

export interface ISyncLog {
  _id?: mongoose.Types.ObjectId;
  fromDate: string;
  toDate: string;
  statusCode: number;
  message: string;
  duration: number;
  reservationsCount: number;
  cancellationsCount: number;
  adaptionDate: string;
}
