import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const cakeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    contains: { type: [String], required: true },
    image: { type: String, required: true },
    isNew: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    stock: { type: Number, default: 0 }
  },
  {
    timestamps: true,
  }
);

const cakeModel = mongoose.models.cake || mongoose.model("cake", cakeSchema);

export default cakeModel;