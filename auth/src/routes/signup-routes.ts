import express from "express";

import { validateRequest } from "@kofitickets/common";
import { bodyValidation, signup } from "../controller/signup-controller";

const router = express.Router();

router.post("/api/users/signup", bodyValidation, validateRequest, signup);

export { router as signupRouter };
