import express from "express"
import { body } from "express-validator"
import { authenticate, allowAdminOnly } from "../middleware/authMiddleware.js"
import {
  userLogin,
  userSignUp,
  getUsers,
  deleteUser,
} from "../controller/userController.js"

const router = express.Router()

router.post(
  "/login",
  [
    body("email").not().isEmpty().isEmail(),
    body("password").not().isEmpty().isString(),
  ],
  userLogin
)
router.post(
  "/signup",
  [
    body("name").not().isEmpty().isString(),
    body("mobile").not().isEmpty().isString(),
    body("email").not().isEmpty().isEmail(),
    body("password").not().isEmpty().isString(),
  ],
  userSignUp
)

router.route("/").get(authenticate, allowAdminOnly, getUsers)
router.route("/:id").delete(authenticate, allowAdminOnly, deleteUser)

export default router
