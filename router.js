import { Router } from "express";
import Controller from "./controller.js";
import UserModel from "./frontend/src/models/User.js";
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const controller = new Controller();
const router = new Router();

router.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/public', 'index.html'));
})
router.get('/', controller.getUsers);

router.post('/login', controller.login);

export default router;