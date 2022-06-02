import { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { BadRequestError } from "@kofitickets/common";
import { User } from "../models/user-model";
import { Password } from "../services/password";

export const bodyValidation = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").trim().notEmpty().withMessage("You must supply a password"),
];

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email }).select("+password");

  if (
    !existingUser ||
    !(await Password.compare(existingUser.password, password))
  ) {
    throw new BadRequestError("Invalid credentials");
  }

  // generate Jwt
  const userJwt = jwt.sign(
    { id: existingUser._id, email: existingUser.email },

    process.env.JWT_KEY! // ! tells typescript to chill
  );

  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(200).send(existingUser);
};
