import express from 'express';
import { userPlanSchema } from '../validators/userPlanValidator.js';
import { db } from '../firebase.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const result = userPlanSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  const data = result.data;
  const docRef = await db.collection('user_plans').add(data);
  return res.json({ id: docRef.id, ...data });
});

router.get('/', async (req, res) => {
  const snapshot = await db.collection('user_plans').get();
  const userPlans = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(userPlans);
});

export default router;
