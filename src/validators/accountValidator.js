import { z } from 'zod';

export const accountSchema = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  broker_name: z.string(),
  type: z.enum(['real', 'demo']),
  created_at: z.string().optional(),
});
