import { db } from '../firebase.js';
import { groupTradesByMonth } from '../utils/tradeAggregations.js';

export const getDashboardStats = async (req, res) => {
  try {
    const tradesCount = (await db.collection('trades').get()).size;
    const accountsCount = (await db.collection('accounts').get()).size;
    const usersCount = (await db.collection('users').get()).size;

    res.json({ tradesCount, accountsCount, usersCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};

export const getTradesByMonth = async (req, res) => {
  try {
    const snapshot = await db.collection('trades').get();
    const trades = snapshot.docs.map(doc => doc.data());
    const data = groupTradesByMonth(trades);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch trades by month' });
  }
};
