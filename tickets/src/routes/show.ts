import express, { Request, Response } from "express";
import { showTicket } from "../controller/show-controller";

const router = express.Router();

router.get("/api/tickets/:id", showTicket);

export { router as showTicketRouter };
