import mongoose from "mongoose";
import User from "../mongodb/model/user.js";
import { handleUpload } from "../utils/cloudinary.js";

/* ============= READ ============== */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().lean();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).lean();

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============= CREATE ============== */
const createUser = async (req, res) => {
  try {
    const { _id, _type, name, email, imageUrl } = req.body;

    const userExists = await User.findOne({ email }).lean();

    if (userExists) return res.status(200).json(userExists);

    const avatarUrl = imageUrl
      ? imageUrl
      : req?.files
      ? (await handleUpload(req.files[0])).url
      : "";

    const id = _id ? _id : new mongoose.mongo.ObjectId();

    const newUser = await User.create({
      _id: id,
      _type,
      name,
      email,
      avatar: avatarUrl,
    });

    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getAllUsers, createUser, getUserInfoById };
