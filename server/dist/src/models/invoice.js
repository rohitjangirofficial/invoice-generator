"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const invoiceSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
const Invoice = mongoose_1.default.model("Invoice", invoiceSchema);
exports.default = Invoice;
