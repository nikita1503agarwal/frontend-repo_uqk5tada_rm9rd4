import { useState } from 'react'
import SearchBar from './components/SearchBar'
import ResultsList from './components/ResultsList'

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || ''

  const onSearch = async ({ q, lat, lng }) => {
    try {
      setError('')
      setLoading(true)
      const url = `${backend}/api/search?q=${encodeURIComponent(q)}&lat=${lat}&lng=${lng}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('Search failed')
      const data = await res.json()
      setResults(data)
    } catch (e) {
      setError(e.message)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen p-6">
        <header className="max-w-5xl mx-auto text-center py-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Nearest Store Product Finder</h1>
          <p className="text-blue-200 mt-3">Search for a product and well show nearby stores that have it in stock.</p>
        </header>

        <main className="max-w-5xl mx-auto space-y-6">
          <SearchBar onSearch={onSearch} />
          <ResultsList results={results} loading={loading} error={error} />
        </main>

        <footer className="max-w-5xl mx-auto text-center mt-12 text-blue-300/60 text-sm">
          Tip: Click 		"Use my location" to autofill your coordinates.
        </footer>
      </div>
    </div>
  )
}

export default App
