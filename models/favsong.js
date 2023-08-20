import mongoose, { Schema, models } from "mongoose";

const songSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Add other song-related fields as needed
});

const favSongSchema = new mongoose.Schema({
  user: { type: String, required: true },
  songLists: [songSchema],
  // Other song-related fields
});

const FavSong = mongoose.model("FavSong", favSongSchema);
export default FavSong;
