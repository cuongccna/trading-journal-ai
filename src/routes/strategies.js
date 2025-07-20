import express from 'express';
import { strategySchema } from '../validators/strategyValidator.js';
import { db } from '../firebase.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const result = strategySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  try {
    const data = result.data;
    const docRef = await db.collection('strategies').add(data);
    return res.json({ id: docRef.id, ...data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create strategy' });
  }
});

router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('strategies').get();
    const strategies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(strategies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch strategies' });
  }
});

export default router;
