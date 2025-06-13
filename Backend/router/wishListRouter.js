import express from "express";
import { toggleWishlist, getWishlist } from "../controller/wishListController.js";
import authMiddleware from '../middleware/auth.js'

const router = express.Router();

router.post("/toggle", authMiddleware, toggleWishlist);
router.post("/", authMiddleware, getWishlist);

export default router;
