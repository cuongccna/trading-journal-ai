import { z } from 'zod';

export const tagSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
});
