import { db } from '../config/firebase.js';
import { v4 as uuidv4 } from 'uuid';

export const createTag = async (req, res) => {
  try {
    const id = uuidv4();
    const tag = { id, ...req.body };
    await db.collection('tags').doc(id).set(tag);
    res.status(201).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create tag' });
  }
};

export const getTags = async (req, res) => {
  try {
    const snapshot = await db.collection('tags').get();
    const tags = snapshot.docs.map(doc => doc.data());
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
};

export const updateTag = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('tags').doc(id).update(req.body);
    const updated = (await db.collection('tags').doc(id).get()).data();
    if (updated) res.json(updated);
    else res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update tag' });
  }
};

export const deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('tags').doc(id).delete();
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete tag' });
  }
};