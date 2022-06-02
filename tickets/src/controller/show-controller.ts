import { NotFoundError } from "@kofitickets/common";
import { Request, Response } from "express";
import { Ticket } from "../models/ticket-model";

export const showTicket = async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
};
