import express from "express";
import { body } from "express-validation";
import { userLogin } from "../controller/userController";

const router = express.route();
router.post(
  "/login",
  [
    body("email").not().isEmpty().isString(),
    body("password").not().isEmpty().isString(),
  ],
  userLogin
);

export default userRoutes;
