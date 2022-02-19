import express from "express";
import { body } from "express-validator";

import { userLogin, userSignUp } from "../controller/userController.js";

const router = express.Router();

router.post(
  "/login",
  [
    body("email").not().isEmpty().isEmail(),
    body("password").not().isEmpty().isString(),
  ],
  userLogin
);
router.post(
  "/signup",
  [
    body("firstName").not().isEmpty().isString(),
    body("lastName").not().isEmpty().isString(),
    body("email").not().isEmpty().isEmail(),
    body("password").not().isEmpty().isString(),
  ],
  userSignUp
);

export default router;
