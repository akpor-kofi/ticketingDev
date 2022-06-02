import { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user-model";
import { BadRequestError } from "@kofitickets/common";

export const bodyValidation = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),
];

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.build({ email, password });

    // generate Jwt
    const userJwt = jwt.sign(
      { id: newUser._id, email: newUser.email },

      process.env.JWT_KEY! // ! tells typescript to chill
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };
    res.status(201).send(newUser);
  } catch (err) {
    throw new BadRequestError("email in use"); // duplicate key
  }

  //  await newUser.save();
};
