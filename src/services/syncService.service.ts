import { Service, Inject } from "typedi";
import { IReservation } from "../interfaces/IReservation.interface";
import { ICancellation } from "../interfaces/ICancellation.interface";
import { ISyncLog } from "../interfaces/ISyncLogs.interface";
@Service()
export default class SyncService {
  constructor(
    @Inject("AppSettingModel") private AppSettingModel: Models.AppSettingModel,
    @Inject("ReservationModel")
    private ReservationModel: Models.ReservationModel,
    @Inject("CancellationModel")
    private CancellationModel: Models.CancellationModel,
    @Inject("SyncLogModel") private SyncLogModel: Models.SyncLogModel,
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
    doc: ICancellation,
  ): Promise<{ cancelRecord: ICancellation }> {
    try {
      let cancelRecord = await this.CancellationModel.create(doc);
      return { cancelRecord };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  //create sync log
  public async createSyncLog(doc: ISyncLog): Promise<{ syncRecord: ISyncLog }> {
    try {
      let syncRecord = await this.SyncLogModel.create(doc);
      return { syncRecord };
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

  //syncLogs
  public async findLogs(key: object): Promise<{ syncLogs: ISyncLog[] }> {
    try {
      let syncLogs = await this.SyncLogModel.find(key, {
        _id: 0,
        fromDate: 1,
        toDate: 1,
      }).sort({ adaptionDate: -1 });
      return { syncLogs };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
