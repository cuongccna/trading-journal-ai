import express from 'express';
import { tagSchema } from '../validators/tagValidator.js';
import {
  createTag,
  getTags,
  updateTag,
  deleteTag,
} from '../controllers/tagController.js';

const router = express.Router();

router.post('/', (req, res) => {
  const result = tagSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  req.body = result.data;
  return createTag(req, res);
});

router.get('/', getTags);

router.put('/:id', updateTag);

router.delete('/:id', deleteTag);

export default router;
