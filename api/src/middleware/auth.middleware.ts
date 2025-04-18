import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';
import { User } from "../generated/prisma";

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = verifyJwt(token);
    // Instead of req.user, attach to any key
    (req as any).user = {
      id: (decoded as any).id,
      email: (decoded as any).email,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};