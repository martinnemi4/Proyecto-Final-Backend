import { Router } from "express";
import passport from "passport";
import uploader from "../services/uploader.js";
import sessionsController from "../controllers/sessions.controller.js";

const router = Router();

router.post('/register', uploader.single('avatar'),sessionsController.register);
router.post('/login',passport.authenticate('login' /*,{ failureRedirect: '/loginFail', session: false }*/),sessionsController.login);
router.get('/loginFail',sessionsController.loginFail);

export default router;