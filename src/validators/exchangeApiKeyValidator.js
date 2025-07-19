import { z } from 'zod';

export const exchangeApiKeySchema = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  exchange_name: z.string(),
  api_key: z.string(),
  api_secret: z.string(), // encrypted
  ip_whitelist: z.array(z.string()).optional(),
  permissions: z.array(z.string()).optional(),
  is_active: z.boolean(),
  created_at: z.string().optional(),
  last_used_at: z.string().optional(),
});
