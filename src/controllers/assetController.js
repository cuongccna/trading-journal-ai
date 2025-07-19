import { db } from '../config/firebase.js';
import { v4 as uuidv4 } from 'uuid';

export const createAsset = async (req, res) => {
  const id = uuidv4();
  const asset = { id, ...req.body };
  await db.collection('assets').doc(id).set(asset);
  res.status(201).json(asset);
};

export const getAssets = async (req, res) => {
  const snapshot = await db.collection('assets').get();
  const assets = snapshot.docs.map(doc => doc.data());
  res.json(assets);
};

export const updateAsset = async (req, res) => {
  const { id } = req.params;
  await db.collection('assets').doc(id).update(req.body);
  const updated = (await db.collection('assets').doc(id).get()).data();
  if (updated) res.json(updated);
  else res.sendStatus(404);
};

export const deleteAsset = async (req, res) => {
  const { id } = req.params;
  await db.collection('assets').doc(id).delete();
  res.sendStatus(204);
};