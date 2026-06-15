/**
 * JWT utilities using jose library
 */
import { SignJWT, jwtVerify } from "jose";

export async function createToken(payload: object, secret: string): Promise<string> {
  const secretKey = new TextEncoder().encode(secret);
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secretKey);
}

export async function verifyToken<T>(token: string, secret: string): Promise<T | null> {
  try {
    const secretKey = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, secretKey, { clockTolerance: 60 });
    return payload as T;
  } catch {
    return null;
  }
}
