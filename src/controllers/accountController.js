import { db } from '../firebase.js';
import { v4 as uuidv4 } from 'uuid';

export const createAccount = async (req, res) => {
  try {
    const id = uuidv4();
    const account = { id, ...req.body };
    await db.collection('accounts').doc(id).set(account);
    res.status(201).json(account);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create account' });
  }
};

export const getAccounts = async (req, res) => {
  try {
    const snapshot = await db.collection('accounts').get();
    const accounts = snapshot.docs.map(doc => doc.data());
    res.json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
};

export const updateAccount = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('accounts').doc(id).update(req.body);
    const updated = (await db.collection('accounts').doc(id).get()).data();
    if (updated) res.json(updated);
    else res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update account' });
  }
};

export const deleteAccount = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('accounts').doc(id).delete();
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete account' });
  }
};