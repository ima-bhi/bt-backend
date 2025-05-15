import mongoose from "mongoose";
import { IAppSetting } from "../interfaces/IAppSetting.interface";

const AppSetting = new mongoose.Schema(
  {
    isActiveCron: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IAppSetting & mongoose.Document>(
  "AppSetting",
  AppSetting,
);
