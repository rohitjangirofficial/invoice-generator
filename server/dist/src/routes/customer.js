"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_1 = require("../controllers/customer");
const customerRouter = express_1.default.Router();
customerRouter.post("/", customer_1.createCustomer);
customerRouter.get("/", customer_1.getAllCustomers);
exports.default = customerRouter;
