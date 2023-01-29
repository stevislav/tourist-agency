import express from "express";
import {
  createPendingOffer,
  deletePendingOffer,
  getPendingOffer,
  getPendingOffers,
  updatePendingOffer,
} from "../controllers/pendingOffer.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createPendingOffer);

//UPDATE
router.put("/:id", verifyAdmin, updatePendingOffer);

//DELETE
router.delete("/:id", verifyAdmin, deletePendingOffer);

//GET
router.get("/find/:id", getPendingOffer);

//GET ALL
router.get("/", getPendingOffers);


export default router;
