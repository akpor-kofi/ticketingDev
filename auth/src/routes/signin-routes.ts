import express from "express";

import { validateRequest } from "@kofitickets/common";
import { bodyValidation, signin } from "../controller/signin-controller";

const router = express.Router();

router.post("/api/users/signin", bodyValidation, validateRequest, signin);

export { router as signinRouter };
