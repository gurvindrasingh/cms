import { Request, Response } from 'express';
import { User } from "../generated/prisma";

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    res.status(200).json({
      message: 'Profile data fetched successfully',
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};