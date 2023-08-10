import Save from "../mongodb/model/save.js";

/* ============= READ ============== */
//  "/:userId"
const getSavedByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const saved = await Save.find({ userId }).lean();

    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============= CREATE ============== */
const createSave = async (req, res) => {
  try {
    const { userId, pinId } = req.body;

    const result = await Save.create({ user: userId, pin: pinId });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============= UPDATE ============== */
const updateSaved = async (req, res) => {
  try {
    const { id, userId, pinId } = req.body;

    const result = await Save.findByIdAndUpdate(id, {
      user: userId,
      pin: pinId,
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============= DELETE ============== */
//  "/:id"
const deleteSaved = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Save.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Pin not found" });
    }

    res.status(200).json({ message: "Save delete successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getSavedByUser, createSave, updateSaved, deleteSaved };
