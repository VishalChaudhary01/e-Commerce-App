import { Router } from "express";
import { createProduct, createReview, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productControllers";
import { isAuth } from "../middlewares/auth";

const router = Router();

router.get("/", getAllProducts)
router.get("/:id", getProductById)
router.post("/", isAuth, createProduct)
router.put("/:id", isAuth, updateProduct)
router.delete("/:id", isAuth, deleteProduct)
router.put("/review/:id", isAuth, createReview)

export default router;