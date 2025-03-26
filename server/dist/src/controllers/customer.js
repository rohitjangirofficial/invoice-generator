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
exports.getAllCustomers = exports.createCustomer = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const customer_1 = __importDefault(require("../models/customer"));
const createCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, mobile, gstNumber, currentReading, address } = req.body;
        if (!name || !mobile || !gstNumber || !currentReading || !address) {
            return next((0, http_errors_1.default)(400, "Please provide all the fields"));
        }
        const newCustomer = yield customer_1.default.create({
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
    }
    catch (error) {
        next(error);
    }
});
exports.createCustomer = createCustomer;
const getAllCustomers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield customer_1.default.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            customers,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCustomers = getAllCustomers;
