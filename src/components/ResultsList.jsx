export default function ResultsList({ results, loading, error }) {
  if (loading) return <div className="text-blue-200">Searching nearby stores...</div>
  if (error) return <div className="text-red-300">{error}</div>
  if (!results || results.length === 0) return <div className="text-blue-200">No matching products found within your radius.</div>

  return (
    <div className="space-y-3">
      {results.map((r) => (
        <div key={r.store_id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-white font-semibold">{r.store_name}</div>
            <div className="text-blue-200 text-sm">{r.address}</div>
            <div className="text-blue-300 text-sm mt-1">{r.product_title} • ${r.price.toFixed(2)} • Qty: {r.quantity}</div>
          </div>
          <div className="text-blue-100 text-sm">
            {r.distance_km} km away
          </div>
        </div>
      ))}
    </div>
  )
}
