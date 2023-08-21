import { NextResponse } from "next/server";
import { User, FavSong } from "../../../models/user";
import connectMongo from "../../../lib/mongodb";
import { useSession } from "next-auth/react";
export async function POST(req) {
  console.log("inside");
  try {
    const { user } = await req.json();

    console.log(user);
    await connectMongo();
    const songs = await FavSong.find({});
    console.log(songs);
    return NextResponse.json({ songs }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
