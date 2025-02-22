import { deleteUser, editProfile, login, register } from "../controllers/userController.js";
import express from "express";
const router=express.Router();

router.post("/user/register",register);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", editProfile);
router.post("/user/login", login);



export default router;