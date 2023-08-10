import Pin from "../mongodb/model/pin.js";
import Save from "../mongodb/model/save.js";
import Comment from "../mongodb/model/comment.js";

import { handleUpload } from "../utils/cloudinary.js";

/* ============= READ ============== */
const getPins = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const pinDetail = await Pin.findById(id)
        .lean()
        .populate("postBy saved")
        .populate({
          path: "comments",
          populate: {
            path: "postBy",
          },
        });
      const morePins = await Pin.find({
        category: pinDetail.category,
        _id: { $ne: id },
      })
        .lean()
        .populate("postBy saved");

      return res.status(200).json({ pinDetail, morePins });
    }

    const pins = await Pin.find().lean().populate("postBy saved");

    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const filterPins = async (req, res) => {
  try {
    const { search, categoryId, userId, type } = req.query;

    // Saved data
    if (type === "Saved" && userId) {
      const savedPin = await Save.find({ user: userId })
        .lean()
        .populate({
          path: "pin",
          populate: {
            path: "postBy saved",
          },
        });

      for (const key in savedPin) {
        savedPin[key] = savedPin[key].pin;
      }

      return res.status(200).json(savedPin);
    }

    // Search data
    const pinFilter = {
      title: new RegExp(search, "i"),
      about: new RegExp(search, "i"),
    };
    if (categoryId) pinFilter.category = categoryId;
    // Pin data created by a user
    if (type === "Created" && userId) pinFilter.postBy = userId;

    const pins = await Pin.find(pinFilter).populate("saved postBy");

    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============= CREATE ============== */
const createPin = async (req, res) => {
  try {
    const { title, about, destination, image, categoryId, userId } = req.body;

    const imageUrl = image
      ? imageUrl
      : req?.files
      ? (await handleUpload(req.files[0])).url
      : "";

    const newPin = await Pin.create({
      title,
      about,
      destination,
      image: imageUrl,
      category: categoryId,
      postBy: userId,
    });

    res.status(200).json(newPin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============= UPDATE ============== */
const updatePin = async (req, res) => {
  try {
    res.status(200).json("");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============= DELETE ============== */
const deletePin = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Pin.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Pin not found" });
    }

    try {
      Comment.deleteMany({ pin: id });
      Save.deleteMany({ pin: id });
    } catch (err) {
      console.log(err.message);
    }

    res.status(200).json({ message: "Delete pin successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getPins, filterPins, createPin, updatePin, deletePin };
