import express from "express";
import { verifyAdmin } from './../utils/verifyToken.js';
import { createRoom, updateRoom, deleteRoom, getRoom, getRooms } from './../controllers/room.js';
const router = express.Router();


//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);
//UPDATE
router.put("/:id", verifyAdmin, updateRoom);
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//GET
router.get("/:id", getRoom);

//GET ALL HOTELS
router.get("/", getRooms);

export default router;