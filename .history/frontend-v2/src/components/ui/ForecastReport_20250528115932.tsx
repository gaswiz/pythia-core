<div className="rounded-xl bg-white dark:bg-zinc-900 shadow-input p-6 space-y-6">
  <h3 className="text-lg font-bold text-neutral-800 dark:text-white">
    📈 Forecast Summary
  </h3>

  <div className="grid grid-cols-2 gap-4 text-sm text-neutral-600 dark:text-neutral-300">
    <p><strong>CTR:</strong> 2.8%</p>
    <p><strong>ROI:</strong> 4.5x</p>
    <p><strong>Budget:</strong> €5,000</p>
    <p><strong>Duration:</strong> 30 days</p>
  </div>

  <ResponsiveContainer width="100%" height={300}>
    <ScatterChart>...based on props...</ScatterChart>
  </ResponsiveContainer>
</div>
