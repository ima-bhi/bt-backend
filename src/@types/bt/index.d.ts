import { Document, Model } from "mongoose";
import { IAppSetting } from "../../interfaces/IAppSetting.interface";
import { IReservation } from "../../interfaces/IReservation.interface";
import { ICancellation } from "../../interfaces/ICancellation.interface";
declare global {
  namespace Models {
    export type AppSettingModel = Model<IAppSetting & Document>;
    export type ReservationModel = Model<IReservation & Document>;
    export type CancellationModel = Model<ICancellation & Document>;
  }
}
