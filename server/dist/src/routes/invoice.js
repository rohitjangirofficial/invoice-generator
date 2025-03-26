"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const invoice_1 = require("../controllers/invoice");
const invoiceRouter = express_1.default.Router();
invoiceRouter.post("/", invoice_1.createInvoice);
exports.default = invoiceRouter;
