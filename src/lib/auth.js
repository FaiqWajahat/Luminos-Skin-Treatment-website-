import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

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

/**
 * Guard for admin-only API handlers.
 * Returns a 401 response when the request has no valid admin session, otherwise null:
 *   const denied = requireAdmin(req); if (denied) return denied;
 */
export function requireAdmin(req) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (token && verifyToken(token)) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export { COOKIE_NAME };