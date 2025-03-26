import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Invoice from "../models/invoice";

const createInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      invoiceNumber,
      date,
      customer,
      currentReading,
      previousReading,
      rentAmount,
      freeCopiesCount,
      ratePerReading,
      gstType,
      calculations,
    } = req.body;

    if (
      !invoiceNumber ||
      !date ||
      !customer ||
      !currentReading ||
      !previousReading ||
      !rentAmount ||
      !freeCopiesCount ||
      !ratePerReading ||
      !gstType ||
      !calculations
    ) {
      return next(createHttpError(400, "Please provide all the fields"));
    }

    const newInvoice = await Invoice.create({
      invoiceNo: invoiceNumber,
      date,
      customer,
      currentReading,
      previousReading,
      rentAmount,
      freeCopiesCount,
      ratePerReading,
      gstType,
      calculations,
    });

    res.status(201).json({
      message: "Invoice created successfully",
      invoice: newInvoice,
    });
  } catch (error) {
    next(error);
  }
};

export { createInvoice };
