import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import "dotenv/config";
import userRouter from "./router/userRoute.js";
import cakeRouter from "./router/CakeRouter.js";
import cartRouter from "./router/cartRouter.js";
import wishListRouter from "./router/wishListRouter.js";
import orderRouter from "./router/orderRouter.js";
import contactRouter from "./router/contactRouter.js";

const app = express();
const port = 2000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/user", userRouter);
app.use("/uploads", express.static("uploads"));
app.use("/api/cake",cakeRouter);
app.use("/api/cart",cartRouter)
app.use("/api/wishlist", wishListRouter);
app.use("/api/order",orderRouter)
app.use("/api/contact",contactRouter)


app.listen(port, () =>
  console.log(`Port is running on http://localhost:${port}`)
);
