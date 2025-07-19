import express from 'express';
import { noteSchema } from '../validators/noteValidator.js';
import { db } from '../firebase.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const result = noteSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  const data = result.data;
  const docRef = await db.collection('notes').add(data);
  return res.json({ id: docRef.id, ...data });
});

router.get('/', async (req, res) => {
  const snapshot = await db.collection('notes').get();
  const notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(notes);
});

export default router;
