import express, { NextFunction, Request, Response } from "express";
import { createCustomer, getAllCustomers } from "../controllers/customer";

const customerRouter = express.Router();

customerRouter.post("/", createCustomer);

customerRouter.get("/", getAllCustomers);

export default customerRouter;
