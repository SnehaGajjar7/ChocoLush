import express from 'express'
import { loginUser, profile, registerUser } from '../controller/userController.js'
import authMiddleware from '../middleware/auth.js'


const userRouter = express.Router()

userRouter.post("/login",loginUser)
userRouter.post("/register",registerUser)
userRouter.get("/profile",authMiddleware,profile)

export default userRouter