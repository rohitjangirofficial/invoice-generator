import mongoose from "mongoose";

interface IInvoice {
  _id: string;
  invoiceNo: string;
  date: Date;
  customer: mongoose.Schema.Types.ObjectId;
  currentReading: number;
  previousReading: number;
  rentAmount: number;
  freeCopiesCount: number;
  ratePerReading: number;
  gstType: string;
  calculations: {
    netPayableReading: number;
    totalT1: number;
    cgst: number;
    sgst: number;
    igst: number;
    grandTotal: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const invoiceSchema = new mongoose.Schema<IInvoice>(
  {
    invoiceNo: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer", // Reference to Customer collection
      required: true,
    },
    currentReading: {
      type: Number,
      required: true,
      min: 0,
    },
    previousReading: {
      type: Number,
      required: true,
      min: 0,
    },
    rentAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    freeCopiesCount: {
      type: Number,
      required: true,
      min: 0,
    },
    ratePerReading: {
      type: Number,
      required: true,
      min: 0,
    },
    gstType: {
      type: String,
      enum: ["IGST", "CGST_SGST"], 
      required: true,
    },
    calculations: {
      netPayableReading: { type: Number, required: true },
      total: { type: Number, required: true },
      cgst: { type: String, default: undefined },
      sgst: { type: String, default: undefined },
      igst: { type: String, default: undefined },
      grandTotal: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model<IInvoice>("Invoice", invoiceSchema);

export { IInvoice };

export default Invoice;
