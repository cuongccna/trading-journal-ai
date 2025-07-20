import { db } from '../firebase.js';
import { v4 as uuidv4 } from 'uuid';

export const createNote = async (req, res) => {
  const id = uuidv4();
  const note = { id, ...req.body };
  await db.collection('notes').doc(id).set(note);
  res.status(201).json(note);
};

export const getNotes = async (req, res) => {
  const snapshot = await db.collection('notes').get();
  const notes = snapshot.docs.map(doc => doc.data());
  res.json(notes);
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  await db.collection('notes').doc(id).update(req.body);
  const updated = (await db.collection('notes').doc(id).get()).data();
  if (updated) res.json(updated);
  else res.sendStatus(404);
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  await db.collection('notes').doc(id).delete();
  res.sendStatus(204);
};