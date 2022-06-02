import express from "express";
import { getCurrentUser } from "../controller/current-user-controller";
import { currentUser } from "@kofitickets/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, getCurrentUser);

export { router as currentUserRouter };
