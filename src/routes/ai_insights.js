import express from 'express';
import { createAIInsight, getAIInsights, updateAIInsight, deleteAIInsight } from '../controllers/aiInsightController.js';
const router = express.Router();

router.post('/', createAIInsight);
router.get('/', getAIInsights);
router.put('/:id', updateAIInsight);
router.delete('/:id', deleteAIInsight);

export default router;