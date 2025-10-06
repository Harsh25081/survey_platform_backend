import crypto from "crypto";
import bcrypt from "bcryptjs";

export const generatePlainToken = () => {
  // Create a random 32-byte token (URL safe)
  return crypto.randomBytes(32).toString("hex");
};

export const hashToken = async (token) => {
  return await bcrypt.hash(token, 10);
};

export const compareToken = async (token, hash) => {
  return await bcrypt.compare(token, hash);
};
