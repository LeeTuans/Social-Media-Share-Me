import Comment from "../mongodb/model/comment.js";

/* ============= READ ============== */
// ":userId"
const getComments = async (req, res) => {
  try {
    const { userId } = req.params;

    const Comment = await Comment.find({ userId }).lean();

    res.status(200).json(Comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============= CREATE ============== */
const createComment = async (req, res) => {
  try {
    const { comment, userId, pinId } = req.body;

    const result = await Comment.create({
      comment,
      postBy: userId,
      pin: pinId,
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============= UPDATE ============== */
const updateComment = async (req, res) => {
  try {
    const { id, comment, userId, pinId } = req.body;

    const result = await Comment.findByIdAndUpdate(id, {
      comment,
      postBy: userId,
      pin: pinId,
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============= DELETE ============== */
// "/:id"
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Comment.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Pin not found" });
    }

    res.status(200).json({ message: "Comment delete successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getComments, createComment, updateComment, deleteComment };
