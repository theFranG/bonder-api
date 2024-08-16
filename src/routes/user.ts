import { Router } from 'express';

import {checkJwt} from '../middlewares/jwt';

import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';

const router = Router();

router.post("/login", AuthController.login);

router.get("/",[checkJwt],UserController.get);
router.post("/register",  UserController.create);


export default router;
