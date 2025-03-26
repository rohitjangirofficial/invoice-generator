import express from "express";
import { createInvoice } from "../controllers/invoice";

const invoiceRouter = express.Router();

invoiceRouter.post("/", createInvoice);

export default invoiceRouter;
