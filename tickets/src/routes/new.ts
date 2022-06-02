import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@kofitickets/common";
import { createTicket, bodyValidation } from "../controller/new-controller";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  bodyValidation,
  validateRequest,
  createTicket
);

export { router as createTicketRouter };
