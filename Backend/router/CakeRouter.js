import express from "express";
import multer from "multer";
import fs from "fs";
import {addCake, getCakeById, getRelatedCakes, listCake, multiple, removeCake } from "../controller/CakeController.js";

const cakeRouter = express.Router();

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

cakeRouter.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  addCake
);

cakeRouter.get("/list",listCake)
cakeRouter.post("/remove",removeCake)
cakeRouter.get("/:id",getCakeById)
cakeRouter.get("/:id/related", getRelatedCakes);
cakeRouter.post("/multiple", multiple);

export default cakeRouter;
