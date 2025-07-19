import { db } from '../config/firebase.js';
import { v4 as uuidv4 } from 'uuid';

export const createAIInsight = async (req, res) => {
  const id = uuidv4();
  const aiInsight = { id, ...req.body };
  await db.collection('ai_insights').doc(id).set(aiInsight);
  res.status(201).json(aiInsight);
};

export const getAIInsights = async (req, res) => {
  const snapshot = await db.collection('ai_insights').get();
  const aiInsights = snapshot.docs.map(doc => doc.data());
  res.json(aiInsights);
};

export const updateAIInsight = async (req, res) => {
  const { id } = req.params;
  await db.collection('ai_insights').doc(id).update(req.body);
  const updated = (await db.collection('ai_insights').doc(id).get()).data();
  if (updated) res.json(updated);
  else res.sendStatus(404);
};

export const deleteAIInsight = async (req, res) => {
  const { id } = req.params;
  await db.collection('ai_insights').doc(id).delete();
  res.sendStatus(204);
};