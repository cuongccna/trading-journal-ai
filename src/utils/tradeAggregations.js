export function groupTradesByMonth(trades) {
  const stats = {};
  for (const trade of trades) {
    if (!trade.entry_datetime) continue;
    const month = new Date(trade.entry_datetime).toISOString().slice(0, 7);
    stats[month] = (stats[month] || 0) + 1;
  }

  return Object.entries(stats)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, count]) => ({ month, count }));
}
