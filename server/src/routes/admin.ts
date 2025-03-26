import express from "express";
import { authenticate } from "../middlewares/auth";
import {
  createAdmin,
  loginAdmin,
  logoutAdmin,
  verifyAdmin,
} from "../controllers/admin";

const adminRouter = express.Router();

adminRouter.post("/", createAdmin);

adminRouter.post("/login", loginAdmin);

adminRouter.get("/verify", authenticate, verifyAdmin);

adminRouter.get("/logout", authenticate, logoutAdmin);

export default adminRouter;
