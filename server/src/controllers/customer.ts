import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Customer from "../models/customer";

const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, mobile, gstNumber, currentReading, address } = req.body;

    if (!name || !mobile || !gstNumber || !currentReading || !address) {
      return next(createHttpError(400, "Please provide all the fields"));
    }

    const newCustomer = await Customer.create({
      name,
      mobile,
      gstNumber,
      currentReading,
      address,
    });

    res.status(201).json({
      message: "Customer created successfully",
      customer: newCustomer,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customers = await Customer.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      customers,
    });
  } catch (error) {
    next(error);
  }
};

export { createCustomer, getAllCustomers };
