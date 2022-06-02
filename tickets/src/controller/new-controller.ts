import { Request, Response } from "express";
import { body } from "express-validator";

import { Ticket } from "../models/ticket-model";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";

export const bodyValidation = [
  body("title").not().isEmpty().withMessage("title can not be empty"),
  body("price").isFloat({ gt: 0 }).withMessage("price must be greater than 0"),
];

export const createTicket = async (req: Request, res: Response) => {
  const { title, price } = req.body;
  const currentUser = req.currentUser!;

  try {
    const newTicket = await Ticket.build({
      title,
      price,
      userId: currentUser.id,
    });

    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: newTicket.id,
      title: newTicket.title,
      price: newTicket.price,
      userId: newTicket.userId,
    });

    res.status(201).send(newTicket);
  } catch (err) {
    console.log(err);
  }
};
