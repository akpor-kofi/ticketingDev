import { Publisher, Subjects, TicketCreatedEvent } from "@kofitickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
