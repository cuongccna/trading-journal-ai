import { z } from 'zod';

// Leg schema cho Multi-leg trade (options/futures)
export const legSchema = z.object({
  leg_type: z.string(), // e.g., "call", "put", "future"
  side: z.string(),     // Buy/Sell/Long/Short
  strike: z.number().optional(),
  expiry_date: z.string().optional(), // ISO string date
  quantity: z.number(),
});

export const tradeSchema = z.object({
  id: z.string().optional(), // uuid
  user_id: z.string(),
  account_id: z.string(),
  asset_type: z.string(),
  symbol: z.string(),
  side: z.enum(['Buy', 'Sell', 'Long', 'Short']),
  size: z.number(),
  entry_price: z.number(),
  entry_datetime: z.string(), // ISO date string
  exit_price: z.number().optional(),
  exit_datetime: z.string().optional(), // ISO date string
  stop_loss: z.number().optional(),
  take_profit: z.number().optional(),
  commissions: z.number().optional(),
  notes: z.string().optional(),
  strategy_id: z.string().optional(),
  tags: z.array(z.string()).optional(),
  legs: z.array(legSchema).optional(), // multi-leg options/futures
  timezone: z.string().optional(),
  currency: z.string().optional(),
});
