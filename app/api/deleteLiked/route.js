import { NextResponse } from "next/server";
import { User, FavSong } from "../../../models/user";
import connectMongo from "../../../lib/mongodb";
export async function POST(req) {
  console.log(req);
  const { user, song } = await req.json();
  console.log("inside");
  console.log("User:", user);
  console.log("Songname:", song);

  // console.log(await FavSong.find({}));
  try {
    await connectMongo();
    const favSongExists = await FavSong.deleteOne({
      user: user,
      song: song,
    });
    if (favSongExists) {
      console.log("Song deleted successfully");
    }
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "Added" }, { status: 200 });
}
