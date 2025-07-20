import { db } from '../firebase.js';
import { v4 as uuidv4 } from 'uuid';

export const createAIInsight = async (req, res) => {
  try {
    const id = uuidv4();
    const aiInsight = { id, ...req.body };
    await db.collection('ai_insights').doc(id).set(aiInsight);
    res.status(201).json(aiInsight);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create AI insight' });
  }
};

export const getAIInsights = async (req, res) => {
  try {
    const snapshot = await db.collection('ai_insights').get();
    const aiInsights = snapshot.docs.map(doc => doc.data());
    res.json(aiInsights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch AI insights' });
  }
};

export const updateAIInsight = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('ai_insights').doc(id).update(req.body);
    const updated = (await db.collection('ai_insights').doc(id).get()).data();
    if (updated) res.json(updated);
    else res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update AI insight' });
  }
};

export const deleteAIInsight = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('ai_insights').doc(id).delete();
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete AI insight' });
  }
};