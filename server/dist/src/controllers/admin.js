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
exports.logoutAdmin = exports.verifyAdmin = exports.loginAdmin = exports.createAdmin = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const admin_1 = __importDefault(require("../models/admin"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const createAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body; // Destructure name, email, and password from req.body
        if (!name || !email || !password) {
            return next((0, http_errors_1.default)(400, "Please provide all the fields"));
        }
        const admin = yield admin_1.default.findOne({ email: email });
        if (admin) {
            return next((0, http_errors_1.default)(400, "Admin already exists"));
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newAdmin = yield admin_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            message: "Admin created successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createAdmin = createAdmin;
const loginAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next((0, http_errors_1.default)(400, "Please provide all the fields"));
        }
        const admin = yield admin_1.default.findOne({ email: email });
        if (!admin) {
            return next((0, http_errors_1.default)(404, "Invalid email or password."));
        }
        const isMatch = yield bcrypt_1.default.compare(password, admin.password);
        if (!isMatch) {
            return next((0, http_errors_1.default)(400, "Invalid email or password."));
        }
        const token = jsonwebtoken_1.default.sign({ _id: admin._id }, config_1.default.jwtSecret, {
            expiresIn: "1d",
        });
        res.cookie("token", token).status(200).json({
            message: "Login successful",
            adminId: admin._id,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.loginAdmin = loginAdmin;
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _req = req;
        res.status(200).json({
            message: "Admin verified successfully",
            adminId: _req.adminId,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyAdmin = verifyAdmin;
const logoutAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token").status(200).json({
            message: "Logout successful",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.logoutAdmin = logoutAdmin;
