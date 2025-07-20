import express from 'express';
import { tradeSchema } from '../validators/tradeValidator.js';
import { db } from '../firebase.js';
import { createTrade, deleteTrade, getTrades, updateTrade } from '../controllers/tradeController.js';
import { de } from 'zod/locales';

const router = express.Router();

router.post('/', async (req, res) => {
  const result = tradeSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  try {
    const data = result.data;
    const docRef = await db.collection('trades').add(data);
    return res.json({ id: docRef.id, ...data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create trade' });
  }
});

router.post('/', createTrade);
router.get('/', getTrades);
router.put('/:id', updateTrade);
router.delete('/:id', deleteTrade);

export default router;