import express from 'express';
import { assetSchema } from '../validators/assetValidator.js';
import { db } from '../firebase.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const result = assetSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }

  try {
    const data = result.data;
    const docRef = await db.collection('asset_types').add(data);
    return res.json({ id: docRef.id, ...data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create asset type' });
  }
});

router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('asset_types').get();
    const assetTypes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(assetTypes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch asset types' });
  }

});

export default router;
