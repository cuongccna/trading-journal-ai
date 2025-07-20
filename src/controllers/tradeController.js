import { db } from '../firebase.js';
import { v4 as uuidv4 } from 'uuid';

export const createTrade = async (req, res) => {
  const id = uuidv4();
  const trade = { id, ...req.body };
  await db.collection('trades').doc(id).set(trade);
  res.status(201).json(trade);
};

export const getTrades = async (req, res) => {
  const snapshot = await db.collection('trades').get();
  const trades = snapshot.docs.map(doc => doc.data());
  res.json(trades);
};

export const updateTrade = async (req, res) => {
  const { id } = req.params;
  await db.collection('trades').doc(id).update(req.body);
  const updated = (await db.collection('trades').doc(id).get()).data();
  if (updated) res.json(updated);
  else res.sendStatus(404);
};

export const deleteTrade = async (req, res) => {
  const { id } = req.params;
  await db.collection('trades').doc(id).delete();
  res.sendStatus(204);
};