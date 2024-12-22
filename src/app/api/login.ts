import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "@/data/users";

const SECRET_KEY = "babonbo-secret-key";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = findUserByEmail(email);

  if (user && user.password === password) {
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return NextResponse.json({ token });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
