import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import * as jose from "jose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(404).json("unknown endpoint");
  }

  let { email, password } = req.body;
  const errors: string[] = [];
  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid",
    },
    {
      valid: validator.isLength(password, { min: 1 }),
      errorMessage: "Password is invalid",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });
  if (errors.length > 0) {
    return res.status(400).json({ errorMessage: errors[0] });
  }

  const prisma = new PrismaClient();

  //   const userWithEmail = await prisma.user.findUnique({ where: { email } });
  const userWithEmail = await prisma.user.findFirst({ where: { email } });

  if (!userWithEmail) {
    res.status(401).json({ errorMessage: "Email or password is not valid" });
  }

  const isMatch = await bcrypt.compare(password, userWithEmail?.password || "");
  if (!isMatch) {
    res.status(401).json({ errorMessage: "Email or password is not valid" });
  }

  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT({ email: userWithEmail?.email })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);

  return res.status(200).json({ token });
}
