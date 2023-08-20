import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// const User = mongoose.models.User || mongoose.model("User", userSchema);

// const songSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   // Add other song-related fields as needed
// });

const favSongSchema = new mongoose.Schema({
  user: { type: String, required: true },
  song: { type: String, required: true },
  // Other song-related fields
});

// const FavSong =
//   mongoose.models.User || mongoose.model("FavSong", favSongSchema);

// export default { User, FavSong };
export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const FavSong =
  mongoose.models.FavSong || mongoose.model("FavSong", favSongSchema);
