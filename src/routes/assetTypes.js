import express from 'express';
import { assetTypeSchema } from '../validators/assetTypeValidator.js';
import { db } from '../firebase.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const result = assetTypeSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  const data = result.data;
  const docRef = await db.collection('asset_types').add(data);
  return res.json({ id: docRef.id, ...data });
});

router.get('/', async (req, res) => {
  const snapshot = await db.collection('asset_types').get();
  const assetTypes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(assetTypes);
});

export default router;
