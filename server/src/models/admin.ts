import mongoose from "mongoose";

interface IAdmin {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new mongoose.Schema<IAdmin>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);

export { IAdmin };

export default Admin;
