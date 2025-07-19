import { z } from 'zod';

export const userPlanSchema = z.object({
  user_id: z.string(),
  plan_id: z.string(),
  start_date: z.string(), // ISO date
  end_date: z.string(),
  is_active: z.boolean(),
});
