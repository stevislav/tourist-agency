import express from "express";
import { countByContinent, countByCountry, createOffer, deleteOffer, getOffer, getOffers, getSample, updateOffer } from "../controllers/offer.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createOffer);

//UPDATE
router.put("/:id", verifyAdmin, updateOffer);

//DELETE
router.delete("/:id", verifyAdmin, deleteOffer);

//GET
router.get("/find/:id", getOffer);

//GET ALL
router.get("/", getOffers);

router.get("/countByContinent", countByContinent);
router.get("/countByCountry", countByCountry);
router.get("/getSample", getSample)

export default router