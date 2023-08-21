import { NextResponse } from "next/server";
import { User, FavSong } from "../../../models/user";
import connectMongo from "../../../lib/mongodb";
export async function POST(req) {
  console.log(req);
  const { user, songname } = await req.json();
  console.log("inside");
  console.log("User:", user);
  console.log("Songname:", songname);

  // console.log(await FavSong.find({}));
  try {
    await connectMongo();
    let favSong = new FavSong({
      user: user,
      song: songname,
    });
    console.log(favSong);

    console.log(await favSong.save());
    console.log("Successfull");
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "Added" }, { status: 200 });
}
