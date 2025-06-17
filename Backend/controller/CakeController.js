import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import path from "path";
import userModel from "../model/userModel.js";
import cakeModel from "../model/CakeModel.js";

const addCake = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      contains,
      isNew,
      isTrending,
      stock,
    } = req.body;

    // ✅ Get the uploaded image from multer
    const imageFile = req.files?.image?.[0];
    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Image file is required" });
    }

const cleanedContains = typeof contains === "string"
  ? contains.split(",").map(item => item.trim())
  : contains;

    const cake = new cakeModel({
      name,
      description,
      price,
      category,
      contains: cleanedContains,
      image: imageFile.filename,
      isNew,
      isTrending,
      stock,
    });
    

    await cake.save();
    res.json({ success: true, message: "Item added" });
  } catch (error) {
    console.error("Error in addCake:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const listCake = async (req, res) => {
  try {
    const cakes = await cakeModel.find({});

    res.json({ success: true, data:cakes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching item" });
  }
};

const removeCake = async (req, res) => {
  try {
    const cake = await cakeModel.findById(req.body.id);

    if (!cake) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    if (
      cake.image &&
      typeof cake.image === "string" &&
      cake.image.trim() !== ""
    ) {
      const imagePath = path.join(__dirname, "../uploads", cake.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await cakeModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error in remove Item:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while deleting Item" });
  }
};

const getCakeById = async (req, res) => {
  try {
    const cake = await cakeModel.findById(req.params.id);
    if (!cake) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    res.json({ success: true, data: cake });
  } catch (error) {
    console.error("Error in getCakeById:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



const getRelatedCakes = async (req, res) => {
  try {
    const cake = await cakeModel.findById(req.params.id);
    if (!cake) return res.status(404).json({ message: "item not found" });

    const related = await cakeModel
      .find({
        _id: { $ne: cake._id },
        category: cake.category,
      })
      .limit(100);

    res.json({ success: true, data: related });
  } catch (error) {
    console.error("Error in getRelatedCakes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const multiple = async (req, res) => {
  const { ids } = req.body;
  const products = await cakeModel.find({ _id: { $in: ids } });
  res.json({ success: true, products });
};


export {
  addCake,
  listCake,
  removeCake,
  getCakeById,
 
  getRelatedCakes,
  multiple,
};
