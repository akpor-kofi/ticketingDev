import express from "express";
import { requireAuth, validateRequest } from "@kofitickets/common";
import { bodyValidation, updateTicket } from "../controller/update-controller";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  bodyValidation,
  validateRequest,
  updateTicket
);

export { router as updateTicketRouter };
