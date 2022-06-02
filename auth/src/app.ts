import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user-routes";
import { signinRouter } from "./routes/signin-routes";
import { signupRouter } from "./routes/signup-routes";
import { signoutRouter } from "./routes/signout-routes";
import { errorHandler, NotFoundError } from "@kofitickets/common";

const app = express();
app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

// global error handler
app.use(errorHandler);

export { app };
