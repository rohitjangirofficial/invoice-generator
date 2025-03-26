import mongoose from "mongoose";

interface ICustomer {
  _id: string;
  name: string;
  mobile: string;
  gstNumber: string;
  currentReading: number;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new mongoose.Schema<ICustomer>(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    gstNumber: { type: String, required: true },
    currentReading: { type: Number, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

const Customer = mongoose.model<ICustomer>("Customer", customerSchema);

export { ICustomer };

export default Customer;
