"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvoice = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const invoice_1 = __importDefault(require("../models/invoice"));
const createInvoice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { invoiceNumber, date, customer, currentReading, previousReading, rentAmount, freeCopiesCount, ratePerReading, gstType, calculations, } = req.body;
        if (!invoiceNumber ||
            !date ||
            !customer ||
            !currentReading ||
            !previousReading ||
            !rentAmount ||
            !freeCopiesCount ||
            !ratePerReading ||
            !gstType ||
            !calculations) {
            return next((0, http_errors_1.default)(400, "Please provide all the fields"));
        }
        const newInvoice = yield invoice_1.default.create({
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
    }
    catch (error) {
        next(error);
    }
});
exports.createInvoice = createInvoice;
