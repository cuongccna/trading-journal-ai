import { z } from 'zod';

export const aiInsightSchema = z.object({
  id: z.string().optional(),
  trade_id: z.string(),
  user_id: z.string(),
  model_name: z.string(),
  insight_type: z.string(),
  parameters: z.record(z.any()).optional(),
  content: z.string().or(z.record(z.any())),
  confidence_score: z.number(),
  generated_at: z.string(),
});
