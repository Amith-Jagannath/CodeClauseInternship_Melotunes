import { NextResponse } from "next/server";
import { User, FavSong } from "../../../models/user";
import connectMongo from "../../../lib/mongodb";
export async function POST(req) {
  console.log(req);
  const { user, songname, index } = await req.json();
  console.log("inside");
  console.log("User:", user);
  console.log("Songname:", songname);

  // console.log(await FavSong.find({}));
  try {
    await connectMongo();
    const favSongExists = await FavSong.find({ user: user, song: songname });
    if (favSongExists.length == 1) return;
    let favSong = new FavSong({
      user: user,
      song: songname,
      index: index,
    });
    console.log(favSong);

    console.log(await favSong.save());
    console.log("Successfull");
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "Added" }, { status: 200 });
}
