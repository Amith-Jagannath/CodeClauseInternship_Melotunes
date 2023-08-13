import { NextResponse } from "next/server";
import User from "@/models/user";
import connectMongo from "../../../lib/mongodb";
export async function POST(request) {
  const { name, email } = await request.json();
  await connectMongo();
  await User.create({ name, email });
  return NextResponse.json({ message: "User registered" }, { status: 200 });
}
