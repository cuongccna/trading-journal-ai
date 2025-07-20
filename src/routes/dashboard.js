import express from 'express';
import { getDashboardStats, getTradesByMonth } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/stats', getDashboardStats);
router.get('/trades_by_month', getTradesByMonth);

export default router;
