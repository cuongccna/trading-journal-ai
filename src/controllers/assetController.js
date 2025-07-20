import { db } from '../firebase.js';
import { v4 as uuidv4 } from 'uuid';

export const createAsset = async (req, res) => {
  try {
    const id = uuidv4();
    const asset = { id, ...req.body };
    await db.collection('assets').doc(id).set(asset);
    res.status(201).json(asset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create asset' });
  }
};

export const getAssets = async (req, res) => {
  try {
    const snapshot = await db.collection('assets').get();
    const assets = snapshot.docs.map(doc => doc.data());
    res.json(assets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
};

export const updateAsset = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('assets').doc(id).update(req.body);
    const updated = (await db.collection('assets').doc(id).get()).data();
    if (updated) res.json(updated);
    else res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update asset' });
  }
};

export const deleteAsset = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('assets').doc(id).delete();
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete asset' });
  }
};