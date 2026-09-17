import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "luminous-secret-key-change-in-prod";
const COOKIE_NAME = "luminous_token";

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

export { COOKIE_NAME };