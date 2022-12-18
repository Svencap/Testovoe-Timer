import { Router } from "express";
import Controller from "./controller.js";
import UserModel from "./frontend/src/models/User.js";
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

console.log(path.join(__dirname, 'frontend/build', 'index.html'));

const controller = new Controller();
const router = new Router();

router.get('/users', controller.getUsers);

router.post('/login', controller.login);


export default router;