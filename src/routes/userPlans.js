import express from 'express';
import { userPlanSchema } from '../validators/userPlanValidator.js';
import { db } from '../firebase.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const result = userPlanSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  try {
    const data = result.data;
    const docRef = await db.collection('user_plans').add(data);
    return res.json({ id: docRef.id, ...data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user plan' });
  }
});

router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('user_plans').get();
    const userPlans = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(userPlans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user plans' });
  }
});

export default router;
