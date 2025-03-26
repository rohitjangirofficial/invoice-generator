import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Admin from "../models/admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { AuthRequest } from "../middlewares/auth";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body; // Destructure name, email, and password from req.body

    if (!name || !email || !password) {
      return next(createHttpError(400, "Please provide all the fields"));
    }

    const admin = await Admin.findOne({ email: email });

    if (admin) {
      return next(createHttpError(400, "Admin already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createHttpError(400, "Please provide all the fields"));
    }

    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return next(createHttpError(404, "Invalid email or password."));
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return next(createHttpError(400, "Invalid email or password."));
    }

    const token = jwt.sign({ _id: admin._id }, config.jwtSecret as string, {
      expiresIn: "1d",
    });

    res.cookie("token", token).status(200).json({
      message: "Login successful",
      adminId: admin._id,
    });
  } catch (error) {
    next(error);
  }
};

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _req = req as AuthRequest;

    res.status(200).json({
      message: "Admin verified successfully",
      adminId: _req.adminId,
    });
  } catch (error) {
    next(error);
  }
};

const logoutAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token").status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

export { createAdmin, loginAdmin, verifyAdmin, logoutAdmin };
