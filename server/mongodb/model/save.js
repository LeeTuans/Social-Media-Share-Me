import mongoose from "mongoose";

const SaveSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "Users",
    },
    pin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pins",
    },
  },
  { timestamps: true }
);

const Save = mongoose.model("Saves", SaveSchema);

export default Save;
