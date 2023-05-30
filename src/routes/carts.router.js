import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import { executePolicies } from "../middlewares/auth.js";

const router = Router();

router.get('/product/:pro',cartsController.insertProductToCart);
router.get('/purchase', cartsController.purchase);

export default router; 