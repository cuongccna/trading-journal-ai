import { z } from 'zod';

export const assetSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1), // Eg: Stock, Crypto, Forex
  symbol: z.string().min(1),
  currency: z.string().min(1),
  exchange: z.string().optional(),
});