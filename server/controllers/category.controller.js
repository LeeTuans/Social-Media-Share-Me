import Category from "../mongodb/model/category.js";

/* ============= READ ============== */
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().lean();

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCategoryInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).lean();

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============= CREATE ============== */
const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    const newCategory = await Category.create({
      name,
      image,
    });

    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getAllCategories, createCategory, getCategoryInfoById };
