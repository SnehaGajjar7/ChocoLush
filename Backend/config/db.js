import mongoose from "mongoose";

export const connectDB = async () => {
    try {
      await mongoose.connect("mongodb+srv://snehagajjar2004:KSDIcZckZPvjlbD3@cluster0.l76ezjv.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ MongoDB connected");
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error.message);
      process.exit(1);
    }
  };
  