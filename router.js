import { Router } from "express";
import Controller from "./controller.js";


const controller = new Controller();
const router = new Router();

router.get('/', controller.test);
router.post('/login', controller.login);

export default router;