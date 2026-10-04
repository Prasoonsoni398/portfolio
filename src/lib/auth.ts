import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "portfolio_admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "portfolio_crm_secret_key_98237489234";

export const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL || "contact.prasoonsoni@gmail.com",
  password: process.env.ADMIN_PASSWORD || "admin123"
};

export interface AdminUser {
  email: string;
  role: "admin";
  issuedAt: number;
}

export function createSessionToken(email: string): string {
  const payload = JSON.stringify({
    email,
    role: "admin",
    issuedAt: Date.now()
  });

  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("hex");

  const token = Buffer.from(payload).toString("base64") + "." + signature;
  return token;
}

export function verifySessionToken(token: string): AdminUser | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [payloadB64, signature] = parts;
    const payloadStr = Buffer.from(payloadB64, "base64").toString("utf-8");

    const expectedSignature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(payloadStr)
      .digest("hex");

    if (signature !== expectedSignature) return null;

    const payload = JSON.parse(payloadStr) as AdminUser;
    // Session valid for 7 days
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - payload.issuedAt > SEVEN_DAYS_MS) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

export const ADMIN_COOKIE_NAME = SESSION_COOKIE_NAME;
