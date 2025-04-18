import { Request, Response } from "express";
import { signupUser, loginUser } from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const { user, token } = await signupUser(req.body);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await loginUser(req.body);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(401).json({ error: (err as Error).message });
  }
};
