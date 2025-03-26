import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import config from "../config/config";

export interface AuthRequest extends Request {
  adminId: string;
}

interface JwtPayload {
  _id: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["token"];

    if (!token) {
      return next(createHttpError(401, "Authorization token is required."));
    }

    const decodedToken = jwt.verify(
      token,
      config.jwtSecret as string
    ) as JwtPayload;

    const _req = req as AuthRequest;

    _req.adminId = decodedToken._id as string;

    next();
  } catch (error) {
    return next(createHttpError(401, "Invalid token."));
  }
};

export { authenticate };
