import { Request, Response } from "express";
import { Ticket } from "../models/ticket-model";

export const getAllTickets = async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  res.send(tickets);
};
