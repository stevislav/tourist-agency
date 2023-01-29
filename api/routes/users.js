import express from "express";
import { deleteUser, getInactiveUsers, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyStaff, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

router.get("/", verifyStaff, getInactiveUsers);

export default router