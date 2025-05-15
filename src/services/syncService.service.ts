import { Service, Inject } from "typedi";
import { IAppSetting } from "../interfaces/IAppSetting.interface";
import { IReservation } from "../interfaces/IReservation.interface";
import { ICancellation } from "../interfaces/ICancellation.interface";

@Service()
export default class SyncService {
  constructor(
    @Inject("AppSettingModel") private AppSettingModel: Models.AppSettingModel,
    @Inject("ReservationModel")
    private ReservationModel: Models.ReservationModel,
    @Inject("CancellationModel")
    private CancellationModel: Models.CancellationModel,
    @Inject("logger") private logger,
  ) {}

  public async createReservation(
    doc: IReservation,
  ): Promise<{ reservationRecord: IReservation }> {
    try {
      let reservationRecord = await this.ReservationModel.create(doc);
      return { reservationRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createCancellation(
    doc: IReservation,
  ): Promise<{ cancelRecord: ICancellation }> {
    try {
      let cancelRecord = await this.CancellationModel.create(doc);
      return { cancelRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async checkReservation(
    key: object,
  ): Promise<{ existingReservation: IReservation }> {
    try {
      let existingReservation = await this.ReservationModel.findOne(key, {
        UniqueID: 1,
      });
      return { existingReservation };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async checkCancellation(
    key: object,
  ): Promise<{ existingCancellation: ICancellation }> {
    try {
      let existingCancellation = await this.CancellationModel.findOne(key, {
        UniqueID: 1,
      });
      return { existingCancellation };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
