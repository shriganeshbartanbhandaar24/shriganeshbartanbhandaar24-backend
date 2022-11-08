import express from "express"
import {
  getAllProducts,
  showProductDetails,
} from "../controller/productController.js"
const router = express.Router()

router.get("/", getAllProducts)

router.get("/:_id", showProductDetails)
router.get("/addproduct",)

export default router
