import express from 'express';
import { aiInsightSchema } from '../validators/aiInsightValidator.js';
import { db } from '../firebase.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const result = aiInsightSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  const data = result.data;
  const docRef = await db.collection('ai_insights').add(data);
  return res.json({ id: docRef.id, ...data });
});

router.get('/', async (req, res) => {
  const snapshot = await db.collection('ai_insights').get();
  const aiInsights = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(aiInsights);
});

export default router;
