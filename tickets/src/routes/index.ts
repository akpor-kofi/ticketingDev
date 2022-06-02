import express from "express";
import { getAllTickets } from "../controller/index-controller";

const router = express.Router();

router.get("/api/tickets", getAllTickets);

export { router as indexTicketRouter };
