import express from 'express';
import { exchangeApiKeySchema } from '../validators/exchangeApiKeyValidator.js';
import { db } from '../firebase.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const result = exchangeApiKeySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  try {
    const data = result.data;
    const docRef = await db.collection('exchange_api_keys').add(data);
    return res.json({ id: docRef.id, ...data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create exchange API key' });
  }
});

router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('exchange_api_keys').get();
    const keys = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(keys);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch exchange API keys' });
  }
});

export default router;
