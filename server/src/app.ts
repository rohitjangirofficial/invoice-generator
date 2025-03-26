import express from "express";
import config from "./config/config";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import customerRouter from "./routes/customer";
import invoiceRouter from "./routes/invoice";
import adminRouter from "./routes/admin";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.frontendURL,
    credentials: true,
  })
);
app.use(cookieParser());

//Routes
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/invoices", invoiceRouter);
app.use("/api/v1/admin", adminRouter);

// Global error handler
app.use(globalErrorHandler);

export default app;
