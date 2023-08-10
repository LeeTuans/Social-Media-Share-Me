import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    postBy: {
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

const Comment = mongoose.model("Comments", CommentSchema);

export default Comment;
