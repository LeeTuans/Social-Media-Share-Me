import mongoose from "mongoose";

const PinSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    destination: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    postBy: {
      type: String,
      ref: "Users",
    },
  },
  { timestamps: true }
);

PinSchema.virtual("comments", {
  ref: "Comments",
  localField: "_id",
  foreignField: "pin",
});

PinSchema.virtual("saved", {
  ref: "Saves",
  localField: "_id",
  foreignField: "pin",
  justOne: false,
});

const Pin = mongoose.model("Pins", PinSchema);

export default Pin;
