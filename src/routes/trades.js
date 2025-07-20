import express from 'express';
import { createTrade, deleteTrade, getTrades, updateTrade } from '../controllers/tradeController.js';

const router = express.Router();

router.post('/', createTrade);
router.get('/', getTrades);
router.put('/:id', updateTrade);
router.delete('/:id', deleteTrade);

export default router;