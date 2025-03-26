"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const admin_1 = require("../controllers/admin");
const adminRouter = express_1.default.Router();
adminRouter.post("/", admin_1.createAdmin);
adminRouter.post("/login", admin_1.loginAdmin);
adminRouter.get("/verify", auth_1.authenticate, admin_1.verifyAdmin);
adminRouter.get("/logout", auth_1.authenticate, admin_1.logoutAdmin);
exports.default = adminRouter;
