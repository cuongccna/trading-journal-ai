import { z } from 'zod';

export const userProfileSchema = z.object({
  user_id: z.string(),
  display_name: z.string().optional(),
  plan: z.enum(['free', 'pro']).default('free'),
});
