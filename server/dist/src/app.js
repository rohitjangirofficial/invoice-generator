"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const customer_1 = __importDefault(require("./routes/customer"));
const invoice_1 = __importDefault(require("./routes/invoice"));
const admin_1 = __importDefault(require("./routes/admin"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: config_1.default.frontendURL,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
//Routes
app.use("/api/v1/customers", customer_1.default);
app.use("/api/v1/invoices", invoice_1.default);
app.use("/api/v1/admin", admin_1.default);
// Global error handler
app.use(globalErrorHandler_1.default);
exports.default = app;
