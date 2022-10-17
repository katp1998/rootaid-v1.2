import {Router} from 'express';

import { createUser, loginUser } from '../controllers/userController';

const router = Router();

router.post("/create", createUser);
router.get("/login", loginUser);

export default router;