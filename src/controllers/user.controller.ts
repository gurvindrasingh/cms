import { Request, Response } from 'express';

export const getProfile = async (req: Request, res: Response) => {
  try {
    // req.user is populated by authenticateJWT middleware
    res.status(200).json({
      message: 'Profile data fetched successfully',
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};