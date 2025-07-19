import { z } from 'zod';

export const marketFlowSchema = z.object({
  id: z.string().optional(),
  asset_type_id: z.string(),
  period_start: z.string(),
  period_end: z.string(),
  inflow_amount: z.number(),
  outflow_amount: z.number(),
  net_flow: z.number(),
  data_source: z.string(),
});
