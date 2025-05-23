import mongoose from "mongoose";
export interface ExtraCharge {
  ChargeDate: string;
  ChargeCode: string;
  ChargeName: string;
  ChargeDesc: string;
  Remark: string;
  Quantity: string;
  AmountBeforeTax: string;
  Amount: string;
}
export interface RentalInfo {
  EffectiveDate: string;
  PackageCode: string;
  PackageName: string;
  RoomTypeCode: string;
  RoomTypeName: string;
  Adult: string;
  Child: string;
  Rent: string;
  RentBeforeTax: string;
  Discount: string;
}

export interface BookingTran {
  SubBookingId: string;
  TransactionId: string;
  Createdatetime: string;
  Modifydatetime: string;
  Status: string;
  IsConfirmed: string;
  CurrentStatus: string;
  VoucherNo: string;
  PackageCode: string;
  PackageName: string;
  RateplanCode: string;
  RateplanName: string;
  eZeePMSRoomid: string;
  RoomTypeCode: string;
  RoomTypeName: string;
  Start: string;
  End: string;
  CurrencyCode: string;
  TotalRate: string;
  TotalAmountAfterTax: string;
  TotalAmountBeforeTax: string;
  TotalTax: string;
  TotalDiscount: string;
  TotalExtraCharge: string;
  TotalPayment: string;
  PayAtHotel: string;
  TACommision: string;
  Salutation: string;
  FirstName: string;
  LastName: string;
  Gender: string;
  DateOfBirth: string;
  SpouseDateOfBirth: string;
  WeddingAnniversary: string;
  Nationality: string;
  Address: string;
  City: string;
  State: string;
  Country: string;
  Zipcode: string;
  Phone: string;
  Mobile: string;
  Fax: string;
  Email: string;
  IdentiyType: string;
  IdentityNo: string;
  ExpiryDate: string;
  TransportationMode: string;
  Vehicle: string;
  PickupDate: string;
  PickupTime: string;
  Source: string;
  Comment: string;
  AffiliateName: string;
  AffiliateCode: string;
  CCLink: string;
  CCNo: string;
  CCType: string;
  CCExpiryDate: string;
  CardHoldersName: string;
  ExtraCharge: ExtraCharge[];
  RentalInfo: RentalInfo;
}

export interface IReservation {
  _id?: mongoose.Types.ObjectId;
  LocationId: string;
  UniqueID: string;
  BookedBy: string;
  Salutation: string;
  FirstName: string;
  LastName: string;
  Gender: string;
  Address: string;
  City: string;
  State: string;
  Country: string;
  Zipcode: string;
  Phone: string;
  Mobile: string;
  Fax: string;
  Email: string;
  BusinessSource: string;
  Source: string;
  IsChannelBooking: string;
  BookingTran: BookingTran;
  entryStatus: string;
  referenceId: string;
}
