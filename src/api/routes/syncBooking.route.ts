import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";

const route = Router();

export default (app: Router) => {
  app.use("/appSetting", route);
};
