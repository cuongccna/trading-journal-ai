import { groupTradesByMonth } from '../src/utils/tradeAggregations.js';

describe('groupTradesByMonth', () => {
  test('groups trades by month', () => {
    const trades = [
      { entry_datetime: '2024-01-10T00:00:00Z' },
      { entry_datetime: '2024-01-15T00:00:00Z' },
      { entry_datetime: '2024-02-10T00:00:00Z' }
    ];

    const result = groupTradesByMonth(trades);
    expect(result).toEqual([
      { month: '2024-01', count: 2 },
      { month: '2024-02', count: 1 }
    ]);
  });
});
