import { Router } from "express";
import Controller from "./controller.js";

const controller = new Controller();
const router = new Router();

router.get('/users', controller.getUsers);

router.post('/login', controller.login);


export default router;