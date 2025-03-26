"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const config = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    frontendURL: process.env.FRONTEND_URL,
};
exports.default = Object.freeze(config);
