import { Router } from "express";
import { executePolicies } from "../middlewares/auth.js";
import viewsController from "../controllers/views.controller.js";

const router = Router();

router.get('/',viewsController.login);
router.get('/home', executePolicies(["USER"]), viewsController.home);
router.get('/products', executePolicies(["USER"]),viewsController.products);
router.get('/contact',executePolicies(["USER"]), viewsController.contact);
router.get('/register',viewsController.register);
router.get('/profile', executePolicies(["USER"]), viewsController.profile)
router.get('/loginFail', viewsController.failLogin)
router.get('/cart', viewsController.cart);
router.get('/finishPurschase', viewsController.finishPurchase);
router.get('/finishedPurchase',executePolicies(["USER"]), viewsController.finishedPurchase);
router.get('/logout',executePolicies(["USER"]), viewsController.logout);

export default router;