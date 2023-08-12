import { currentUser } from "@clerk/nextjs/app-beta";
import { NextResponse } from "next/server";
export async function GET() {
  const user = await currentUser();
  console.log(user);
  if (!user) {
    return NextResponse.json({ message: "You are not logged in" });
  }
  return NextResponse.json({ nam: user.firstName });
  //   return user;
}
