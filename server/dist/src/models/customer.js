"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const customerSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    gstNumber: { type: String, required: true },
    currentReading: { type: Number, required: true },
    address: { type: String, required: true },
}, { timestamps: true });
const Customer = mongoose_1.default.model("Customer", customerSchema);
exports.default = Customer;
