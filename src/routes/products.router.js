import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import uploader from "../services/uploader.js";
import {handleKey} from "../middlewares/keys.js"

const router = Router();

router.use(handleKey)
router.get('/',productsController.getProducts);
router.post('/',uploader.single('thumbnail'), productsController.createProduct);

export default router;