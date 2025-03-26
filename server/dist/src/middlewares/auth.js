"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const authenticate = (req, res, next) => {
    try {
        const token = req.cookies["token"];
        if (!token) {
            return next((0, http_errors_1.default)(401, "Authorization token is required."));
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        const _req = req;
        _req.adminId = decodedToken._id;
        next();
    }
    catch (error) {
        return next((0, http_errors_1.default)(401, "Invalid token."));
    }
};
exports.authenticate = authenticate;
