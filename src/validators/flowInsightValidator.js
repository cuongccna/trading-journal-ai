import { z } from 'zod';

export const flowInsightSchema = z.object({
  id: z.string().optional(),
  market_flow_id: z.string(),
  user_id: z.string(),
  model_name: z.string(),
  insight_type: z.string(),
  content: z.string().or(z.record(z.any())),
  confidence_score: z.number(),
  generated_at: z.string(),
});
