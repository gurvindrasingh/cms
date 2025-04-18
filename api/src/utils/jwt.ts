import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET! as string;
const JWT_EXPIRES_IN = "1h";

// Define a type for the decoded JWT payload
interface JwtPayload {
  userId: number; // Assuming your JWT contains a userId field
}

// Function to sign a JWT
export const signJwt = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Function to verify a JWT
export const verifyJwt = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
