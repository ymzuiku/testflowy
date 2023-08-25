import { createHmac } from "node:crypto";

export function sha256(str: string) {
  if (!sha256.slat) {
    sha256.slat = process.env["slat"] || "";
  }
  return createHmac("sha256", sha256.slat).update(str).digest("hex");
}

sha256.slat = "";
