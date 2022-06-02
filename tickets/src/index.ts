import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await natsWrapper.connect("ticketing", "dcvfdc", "http://nats-srv:4222");

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });

    ["SIGINT", "SIGTERM"].forEach((el) =>
      process.on(el, () => natsWrapper.client.close())
    );

    await mongoose.connect(process.env.MONGO_URI);

    console.log("ticket DB connection established");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("listening on port 3000 !!!");
  });
};

start();
