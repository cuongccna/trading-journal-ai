import express from 'express';
import { marketFlowSchema } from '../validators/marketFlowValidator.js';
import { db } from '../firebase.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const result = marketFlowSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  const data = result.data;
  const docRef = await db.collection('market_flows').add(data);
  return res.json({ id: docRef.id, ...data });
});

router.get('/', async (req, res) => {
  const snapshot = await db.collection('market_flows').get();
  const flows = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(flows);
});

export default router;
