import express from 'express';
import { flowInsightSchema } from '../validators/flowInsightValidator.js';
import { db } from '../firebase.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const result = flowInsightSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  try {
    const data = result.data;
    const docRef = await db.collection('flow_insights').add(data);
    return res.json({ id: docRef.id, ...data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create flow insight' });
  }
});

router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('flow_insights').get();
    const insights = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(insights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flow insights' });
  }
});

export default router;
