import { Document, Model } from "mongoose";
import { IAppSetting } from "../../interfaces/IAppSetting.interface";

declare global {
  namespace Models {
    export type AppSettingModel = Model<IAppSetting & Document>;
  }
}
