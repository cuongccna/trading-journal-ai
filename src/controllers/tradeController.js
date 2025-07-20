import { db } from '../firebase.js';
import { v4 as uuidv4 } from 'uuid';

export const createTrade = async (req, res) => {
  try {
    const id = uuidv4();
    const trade = { id, ...req.body };
    await db.collection('trades').doc(id).set(trade);
    res.status(201).json(trade);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create trade' });
  }
};

export const getTrades = async (req, res) => {
  try {
    const snapshot = await db.collection('trades').get();
    const trades = snapshot.docs.map(doc => doc.data());
    res.json(trades);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch trades' });
  }
};

export const updateTrade = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('trades').doc(id).update(req.body);
    const updated = (await db.collection('trades').doc(id).get()).data();
    if (updated) res.json(updated);
    else res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update trade' });
  }
};

export const deleteTrade = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('trades').doc(id).delete();
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete trade' });
  }
};