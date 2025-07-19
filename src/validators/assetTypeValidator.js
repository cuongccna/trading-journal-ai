import { z } from 'zod';

export const assetTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
});
