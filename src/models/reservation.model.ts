import mongoose from "mongoose";
import { IReservation } from "../interfaces/IReservation.interface";

// Extra Charge Schema
const ExtraChargeSchema = new mongoose.Schema(
  {
    ChargeDate: {
      type: String,
      default: null,
    },
    ChargeCode: {
      type: String,
      default: null,
    },
    ChargeName: {
      type: String,
      default: null,
    },
    ChargeDesc: {
      type: String,
      default: null,
    },
    Remark: {
      type: String,
      default: null,
    },
    Quantity: {
      type: String,
      default: null,
    },
    AmountBeforeTax: {
      type: String,
      default: null,
    },
    Amount: {
      type: String,
      default: null,
    },
  },
  { _id: false },
);

// Rental Info Schema
const RentalInfoSchema = new mongoose.Schema(
  {
    EffectiveDate: {
      type: String,
      default: null,
    },
    PackageCode: {
      type: String,
      default: null,
    },
    PackageName: {
      type: String,
      default: null,
    },
    RoomTypeCode: {
      type: String,
      default: null,
    },
    RoomTypeName: {
      type: String,
      default: null,
    },
    Adult: {
      type: String,
      default: null,
    },
    Child: {
      type: String,
      default: null,
    },
    Rent: {
      type: String,
      default: null,
    },
    RentBeforeTax: {
      type: String,
      default: null,
    },
    Discount: {
      type: String,
      default: null,
    },
  },
  { _id: false },
);

// Booking Transaction Schema
const BookingTranSchema = new mongoose.Schema(
  {
    SubBookingId: {
      type: String,
      default: null,
    },
    TransactionId: {
      type: String,
      default: null,
    },
    Createdatetime: {
      type: String,
      default: null,
    },
    Modifydatetime: {
      type: String,
      default: null,
    },
    Status: {
      type: String,
      default: null,
    },
    IsConfirmed: {
      type: String,
      default: null,
    },
    CurrentStatus: {
      type: String,
      default: null,
    },
    VoucherNo: {
      type: String,
      default: null,
    },
    PackageCode: {
      type: String,
      default: null,
    },
    PackageName: {
      type: String,
      default: null,
    },
    RateplanCode: {
      type: String,
      default: null,
    },
    RateplanName: {
      type: String,
      default: null,
    },
    eZeePMSRoomid: {
      type: String,
      default: null,
    },
    RoomTypeCode: {
      type: String,
      default: null,
    },
    RoomTypeName: {
      type: String,
      default: null,
    },
    Start: {
      type: String,
      default: null,
    },
    End: {
      type: String,
      default: null,
    },
    CurrencyCode: {
      type: String,
      default: null,
    },
    TotalRate: {
      type: String,
      default: null,
    },
    TotalAmountAfterTax: {
      type: String,
      default: null,
    },
    TotalAmountBeforeTax: {
      type: String,
      default: null,
    },
    TotalTax: {
      type: String,
      default: null,
    },
    TotalDiscount: {
      type: String,
      default: null,
    },
    TotalExtraCharge: {
      type: String,
      default: null,
    },
    TotalPayment: {
      type: String,
      default: null,
    },
    PayAtHotel: {
      type: String,
      default: null,
    },
    TACommision: {
      type: String,
      default: null,
    },
    Salutation: {
      type: String,
      default: null,
    },
    FirstName: {
      type: String,
      default: null,
    },
    LastName: {
      type: String,
      default: null,
    },
    Gender: {
      type: String,
      default: null,
    },
    DateOfBirth: {
      type: String,
      default: null,
    },
    SpouseDateOfBirth: {
      type: String,
      default: null,
    },
    WeddingAnniversary: {
      type: String,
      default: null,
    },
    Nationality: {
      type: String,
      default: null,
    },
    Address: {
      type: String,
      default: null,
    },
    City: {
      type: String,
      default: null,
    },
    State: {
      type: String,
      default: null,
    },
    Country: {
      type: String,
      default: null,
    },
    Zipcode: {
      type: String,
      default: null,
    },
    Phone: {
      type: String,
      default: null,
    },
    Mobile: {
      type: String,
      default: null,
    },
    Fax: {
      type: String,
      default: null,
    },
    Email: {
      type: String,
      default: null,
    },
    IdentiyType: {
      type: String,
      default: null,
    },
    IdentityNo: {
      type: String,
      default: null,
    },
    ExpiryDate: {
      type: String,
      default: null,
    },
    TransportationMode: {
      type: String,
      default: null,
    },
    Vehicle: {
      type: String,
      default: null,
    },
    PickupDate: {
      type: String,
      default: null,
    },
    PickupTime: {
      type: String,
      default: null,
    },
    Source: {
      type: String,
      default: null,
    },
    Comment: {
      type: String,
      default: null,
    },
    AffiliateName: {
      type: String,
      default: null,
    },
    AffiliateCode: {
      type: String,
      default: null,
    },
    CCLink: {
      type: String,
      default: null,
    },
    CCNo: {
      type: String,
      default: null,
    },
    CCType: {
      type: String,
      default: null,
    },
    CCExpiryDate: {
      type: String,
      default: null,
    },
    CardHoldersName: {
      type: String,
      default: null,
    },
    ExtraCharge: {
      type: [ExtraChargeSchema],
      default: [],
    },
    RentalInfo: {
      type: RentalInfoSchema,
      default: () => ({}),
    },
  },
  { _id: false },
);

const Reservation = new mongoose.Schema(
  {
    LocationId: {
      type: String,
      default: null,
    },
    UniqueID: {
      type: String,
      default: null,
    },
    BookedBy: {
      type: String,
      default: null,
    },
    Salutation: {
      type: String,
      default: null,
    },
    FirstName: {
      type: String,
      default: null,
    },
    LastName: {
      type: String,
      default: null,
    },
    Gender: {
      type: String,
      default: null,
    },
    Address: {
      type: String,
      default: null,
    },
    City: {
      type: String,
      default: null,
    },
    State: {
      type: String,
      default: null,
    },
    Country: {
      type: String,
      default: null,
    },
    Zipcode: {
      type: String,
      default: null,
    },
    Phone: {
      type: String,
      default: null,
    },
    Mobile: {
      type: String,
      default: null,
    },
    Fax: {
      type: String,
      default: null,
    },
    Email: {
      type: String,
      default: null,
    },
    BusinessSource: {
      type: String,
      default: null,
    },
    Source: {
      type: String,
      default: null,
    },
    IsChannelBooking: {
      type: String,
      default: null,
    },
    BookingTran: {
      type: BookingTranSchema,
      default: () => ({}),
    },
    entryStatus: {
      type: String,
      enum: ["Primary", "Secondary"],
      default: "Primary",
    },
    referenceId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IReservation & mongoose.Document>(
  "Reservation",
  Reservation,
);
