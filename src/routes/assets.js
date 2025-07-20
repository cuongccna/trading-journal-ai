import express from 'express';
import { assetSchema } from '../validators/assetValidator.js';
import {
  createAsset,
  getAssets,
  updateAsset,
  deleteAsset,
} from '../controllers/assetController.js';

const router = express.Router();

router.post('/', (req, res) => {
  const result = assetSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  req.body = result.data;
  return createAsset(req, res);
});

router.get('/', getAssets);

router.put('/:id', updateAsset);

router.delete('/:id', deleteAsset);

export default router;
