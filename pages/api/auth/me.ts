import { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify, SignJWT } from "jose";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function exclude(user, ...keys) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // the way we handle without middleware
  // const bearerToken = req.headers["authorization"] as string;
  // console.log("bearerToken:", bearerToken);

  // if (!bearerToken) {
  //   return res.status(401).json({ error: "Unauthorized request" });
  // }
  // const token = bearerToken.split(" ")[1];

  // if (!token) {
  //   return res.status(401).json({ error: "Unauthorized request" });
  // }

  // const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  // try {
  //   await jwtVerify(token, secret);
  // } catch (error) {
  //   return res.status(401).json({ error: "Unauthorized request" });
  // }

  // with mw
  const bearerToken = req.headers["authorization"] as string;
  const token = bearerToken.split(" ")[1];

  const payload = jwt.decode(token) as { email: string };
  if (!payload.email) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  const user = await prisma.user.findFirst({
    where: { email: payload.email },
    select: { id: true, first_name: true, last_name: true, email: true, city: true, phone: true },
  });

  return res.json({ user });
}
