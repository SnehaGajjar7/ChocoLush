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
      image,
      isNew,
      isTrending,
      stock,
    } = req.body;

    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const cake = new cakeModel({
      name,
      description,
      price,
      category,
      contains,
      image, // directly from req.body
      isNew,
      isTrending,
      stock,
    });

    await cake.save();
    res.json({ success: true, message: "Item added" });
  } catch (error) {
    console.error("Error in add:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const listCake = async (req, res) => {
  try {
    const cakes = await cakeModel.find({});

 
    const cakesWithRatings = cakes.map((cake) => {
      const avg =
        cake.reviews.length > 0
          ? (
              cake.reviews.reduce((sum, review) => sum + review.rating, 0) /
              cake.reviews.length
            ).toFixed(1)
          : 0;

      return {
        ...cake._doc,
        averageRating: avg,
      };
    });

    res.json({ success: true, data: cakesWithRatings });
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

const createReview = async (req, res) => {
  try {
    const cake = await cakeModel.findById(req.params.id);
    if (!cake) {
      return res
        .status(404)
        .json({ success: false, message: "item not found" });
    }

    const { rating, comment } = req.body;
    if (!rating || !comment) {
      return res
        .status(400)
        .json({ success: false, message: "Rating and comment required" });
    }
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const newReview = {
      user: req.userId,
      name: user.name,
      rating,
      comment,
      createdAt: new Date(),
    };

    cake.reviews.push(newReview);
    cake.numReviews = cake.reviews.length;
    cake.rating =
      cake.reviews.reduce((acc, item) => acc + item.rating, 0) /
      cake.reviews.length;

    await cake.save();

    res.json({ success: true, message: "Review added", data: cake });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ success: false, message: "Server error" });
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
  createReview,
  getRelatedCakes,
  multiple,
};
