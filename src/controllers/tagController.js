import { db } from '../config/firebase.js';
import { v4 as uuidv4 } from 'uuid';

export const createTag = async (req, res) => {
  const id = uuidv4();
  const tag = { id, ...req.body };
  await db.collection('tags').doc(id).set(tag);
  res.status(201).json(tag);
};

export const getTags = async (req, res) => {
  const snapshot = await db.collection('tags').get();
  const tags = snapshot.docs.map(doc => doc.data());
  res.json(tags);
};

export const updateTag = async (req, res) => {
  const { id } = req.params;
  await db.collection('tags').doc(id).update(req.body);
  const updated = (await db.collection('tags').doc(id).get()).data();
  if (updated) res.json(updated);
  else res.sendStatus(404);
};

export const deleteTag = async (req, res) => {
  const { id } = req.params;
  await db.collection('tags').doc(id).delete();
  res.sendStatus(204);
};