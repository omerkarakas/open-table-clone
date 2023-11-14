import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  console.log("mw called, before endpoint");

  // const bearerToken = req.headers["authorization"] as string;
  const bearerToken = req.headers.get("authorization") as string;
  console.log("bearerToken:", bearerToken);

  if (!bearerToken) {
    // return res.status(401).json({ error: "Unauthorized request" });
    return new NextResponse(JSON.stringify({ errorMessage: "Unauthorized request" }), {
      status: 401,
    });
  }
  const token = bearerToken.split(" ")[1];

  if (!token) {
    //   return res.status(401).json({ error: "Unauthorized request" });
    return new NextResponse(JSON.stringify({ errorMessage: "Unauthorized request" }), {
      status: 401,
    });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    await jwtVerify(token, secret);
  } catch (error) {
    return new NextResponse(JSON.stringify({ errorMessage: "Unauthorized request" }), {
      status: 401,
    });
  }
}

export const config = {
  matcher: ["/api/auth/me"],
};
