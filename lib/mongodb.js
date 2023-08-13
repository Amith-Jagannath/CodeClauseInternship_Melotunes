const mongoose = require("mongoose");
async function connectMongo() {
  try {
    await mongoose.connect(
      "mongodb+srv://amith:amyth@cluster0.vp74ux2.mongodb.net/Melotunes",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectMongo();

module.exports = connectMongo;
