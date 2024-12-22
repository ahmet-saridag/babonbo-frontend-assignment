import { NextResponse } from "next/server";
import { addUser, findUserByEmail, getUsers } from "@/data/users";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (findUserByEmail(email)) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const newUser = {
    id: getUsers().length + 1,
    email,
    password,
  };

  addUser(newUser);
  return NextResponse.json({ message: "User registered successfully" });
}
