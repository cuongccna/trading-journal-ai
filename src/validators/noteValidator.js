import { z } from 'zod';

export const noteSchema = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  title: z.string(),
  content: z.string(),  // Rich text
  related_trade_id: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
