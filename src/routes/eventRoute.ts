import express from "express";
import { createEvent, getEvents, showEvent, updateEvent, deleteEvent} from "../controllers/eventController"; 

const router = express.Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.get("/:id", showEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
