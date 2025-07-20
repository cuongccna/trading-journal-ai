import express from 'express';
import { assetSchema } from '../validators/assetValidator.js';
import { db } from '../firebase.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const result = assetSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  const data = result.data;
  const docRef = await db.collection('assets').add(data);
  return res.json({ id: docRef.id, ...data });
});

router.get('/', async (req, res) => {
  const snapshot = await db.collection('assets').get();
  const assets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(assets);
});

export default router;
