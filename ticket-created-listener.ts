import { Message } from "node-nats-streaming";
import { Listener } from "./common/src/events/base-listener";
import { Subjects } from "./common/src/events/subject";
import { TicketCreatedEvent } from "./common/src/events/ticket-created-event";

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event data", data);
    msg.ack();
  }
}
