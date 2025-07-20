import express from 'express';
import { accountSchema } from '../validators/accountValidator.js';
import {
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
} from '../controllers/accountController.js';

const router = express.Router();

// Tạo tài khoản mới
router.post('/', (req, res) => {
  const result = accountSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  req.body = result.data;
  return createAccount(req, res);
});

// Lấy tất cả tài khoản
router.get('/', getAccounts);

router.put('/:id', updateAccount);

router.delete('/:id', deleteAccount);

export default router;
