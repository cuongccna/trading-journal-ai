import express from 'express';
import { tagSchema } from '../validators/tagValidator.js';
import { db } from '../firebase.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const result = tagSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  const data = result.data;
  const docRef = await db.collection('tags').add(data);
  return res.json({ id: docRef.id, ...data });
});

router.get('/', async (req, res) => {
  const snapshot = await db.collection('tags').get();
  const tags = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(tags);
});

export default router;
