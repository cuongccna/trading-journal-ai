import express from 'express';
import { strategySchema } from '../validators/strategyValidator.js';
import { db } from '../firebase.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const result = strategySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  const data = result.data;
  const docRef = await db.collection('strategies').add(data);
  return res.json({ id: docRef.id, ...data });
});

router.get('/', async (req, res) => {
  const snapshot = await db.collection('strategies').get();
  const strategies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(strategies);
});

export default router;
