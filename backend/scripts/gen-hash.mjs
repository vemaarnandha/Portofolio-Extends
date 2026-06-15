/**
 * Script untuk generate password hash menggunakan Web Crypto API (PBKDF2)
 * Run: node scripts/gen-hash.mjs [password]
 * Default password: admin123
 */

import { webcrypto } from "node:crypto";

// Polyfill crypto untuk Node.js
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}

const SALT_LENGTH = 16;
const ITERATIONS = 100000;
const KEY_LENGTH = 32;

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const passwordData = encoder.encode(password);

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    passwordData,
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const hash = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    KEY_LENGTH * 8
  );

  const hashArray = new Uint8Array(hash);
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, "0")).join("");
  const hashHex = Array.from(hashArray).map(b => b.toString(16).padStart(2, "0")).join("");

  return `${saltHex}:${hashHex}`;
}

async function main() {
  const password = process.argv[2] || "admin123";
  console.log(`\n🔐 Generating hash for password: "${password}"`);
  const hash = await hashPassword(password);
  console.log("\n✅ Password hash generated:");
  console.log(hash);
  console.log("\n📋 Copy hash ini ke seed/seed.sql untuk password admin default");
  console.log("📋 Atau gunakan untuk membuat admin user baru\n");
}

main().catch(console.error);
