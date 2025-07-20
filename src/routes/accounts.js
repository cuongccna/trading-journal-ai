import express from 'express';
import { accountSchema } from '../validators/accountValidator.js';
import { db } from '../firebase.js';

const router = express.Router();

// Tạo tài khoản mới
router.post('/', async (req, res) => {
  const result = accountSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  try {
    const data = result.data;
    const docRef = await db.collection('accounts').add(data);
    return res.json({ id: docRef.id, ...data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

// Lấy tất cả tài khoản
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('accounts').get();
    const accounts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
});

export default router;
