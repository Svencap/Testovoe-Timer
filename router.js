import { Router } from "express";
import Controller from "./controller.js";
import UserModel from "./frontend/src/models/User.js";


const controller = new Controller();
const router = new Router();

router.get('/', controller.getUsers);


router.post('/login', controller.login);

export default router;