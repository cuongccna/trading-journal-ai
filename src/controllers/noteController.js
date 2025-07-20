import { db } from '../firebase.js';
import { v4 as uuidv4 } from 'uuid';

export const createNote = async (req, res) => {
  try {
    const id = uuidv4();
    const note = { id, ...req.body };
    await db.collection('notes').doc(id).set(note);
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create note' });
  }
};

export const getNotes = async (req, res) => {
  try {
    const snapshot = await db.collection('notes').get();
    const notes = snapshot.docs.map(doc => doc.data());
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('notes').doc(id).update(req.body);
    const updated = (await db.collection('notes').doc(id).get()).data();
    if (updated) res.json(updated);
    else res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update note' });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('notes').doc(id).delete();
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete note' });
  }
};