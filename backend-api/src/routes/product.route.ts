import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const router = Router();

router.get("/popular", ProductController.getPopular);
router.get("/recommended", ProductController.getRecommended)

export default router;