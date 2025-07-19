import express from 'express';
import { createUser, getUsers, loginUser } from '../controllers/userController.js';
const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.post('/login', loginUser);
router.post('/register', createUser);

export default router;