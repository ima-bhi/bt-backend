import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import Logger from "./logger";
import config from "../config";
import cronLoader from "./cron";

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader(config.bt.databaseURL);
  Logger.info("Mongo loaded & connected!");

  const AppSettingModel = {
    name: "AppSettingModel",
    model: require("../models/appSetting.model").default,
  };

  const ReservationModel = {
    name: "ReservationModel",
    model: require("../models/reservation.model").default,
  };
  const CancellationModel = {
    name: "CancellationModel",
    model: require("../models/cancellation.model").default,
  };

  const SyncLogModel = {
    name: "SyncLogModel",
    model: require("../models/syncLogs.model").default,
  };
  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: [
      AppSettingModel,
      ReservationModel,
      CancellationModel,
      SyncLogModel,
    ],
  });

  Logger.info("Dependency Injector loaded");

  await cronLoader();
  Logger.info("Cron loaded");

  await expressLoader({ app: expressApp });
  Logger.info("Express loaded");
};
