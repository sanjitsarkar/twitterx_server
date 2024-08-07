import jwt from 'jsonwebtoken';
import User from '../models/User.model';
import { NextFunction, Request, Response } from 'express';
import { ENV } from '../config/env.cofig';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      throw new Error("Invalid token");
    }

    const user = await User.query().findById(decoded["id"]);
    if (!user) {
      throw new Error("User not found");
    }
    req["user"] = user;
    req["token"] = token;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
