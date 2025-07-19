import { z } from 'zod';

export const strategySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  rules: z.array(z.object({
    field: z.string(),
    operator: z.string(),
    value: z.any(),
  })).optional(),
});
