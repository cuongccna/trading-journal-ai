import { tradeSchema } from '../src/validators/tradeValidator.js';

describe('tradeSchema validation', () => {
  test('valid trade data passes safeParse', () => {
    const validData = {
      user_id: 'user1',
      account_id: 'acc1',
      asset_type: 'stock',
      symbol: 'AAPL',
      side: 'Buy',
      size: 10,
      entry_price: 150,
      entry_datetime: '2024-01-01T00:00:00Z'
    };

    const result = tradeSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test('missing required field fails', () => {
    const invalidData = {
      account_id: 'acc1',
      asset_type: 'stock',
      symbol: 'AAPL',
      side: 'Buy',
      size: 10,
      entry_price: 150,
      entry_datetime: '2024-01-01T00:00:00Z'
    };

    const result = tradeSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  test('invalid enum value fails', () => {
    const invalidData = {
      user_id: 'user1',
      account_id: 'acc1',
      asset_type: 'stock',
      symbol: 'AAPL',
      side: 'Hold',
      size: 10,
      entry_price: 150,
      entry_datetime: '2024-01-01T00:00:00Z'
    };

    const result = tradeSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
