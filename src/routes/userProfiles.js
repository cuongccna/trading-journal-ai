import express from 'express';
import { userProfileSchema } from '../validators/userProfileValidator.js';
import { db } from '../firebase.js';

const router = express.Router();

// Tạo hoặc cập nhật profile
router.post('/', async (req, res) => {
  const result = userProfileSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  const data = result.data;
  await db.collection('user_profiles').doc(data.user_id).set(data, { merge: true });
  return res.json({ id: data.user_id, ...data });
});

// Lấy profile theo user_id
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const doc = await db.collection('user_profiles').doc(user_id).get();
  if (!doc.exists) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  return res.json({ id: doc.id, ...doc.data() });
});

// Lấy tất cả profiles
router.get('/', async (req, res) => {
  const snapshot = await db.collection('user_profiles').get();
  const profiles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(profiles);
});

export default router;
