import express from 'express';
import { exchangeApiKeySchema } from '../validators/exchangeApiKeyValidator.js';
import { db } from '../firebase.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const result = exchangeApiKeySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  const data = result.data;
  const docRef = await db.collection('exchange_api_keys').add(data);
  return res.json({ id: docRef.id, ...data });
});

router.get('/', async (req, res) => {
  const snapshot = await db.collection('exchange_api_keys').get();
  const keys = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(keys);
});

export default router;
