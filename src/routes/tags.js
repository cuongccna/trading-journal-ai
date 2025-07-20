import express from 'express';
import { tagSchema } from '../validators/tagValidator.js';
import { db } from '../firebase.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const result = tagSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  try {
    const data = result.data;
    const docRef = await db.collection('tags').add(data);
    return res.json({ id: docRef.id, ...data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create tag' });
  }
});

router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('tags').get();
    const tags = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

export default router;
