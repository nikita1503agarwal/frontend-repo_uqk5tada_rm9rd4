import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')

  const useMyLocation = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude.toFixed(6))
      setLng(pos.coords.longitude.toFixed(6))
    })
  }

  const submit = (e) => {
    e.preventDefault()
    if (!query || !lat || !lng) return
    onSearch({ q: query, lat: parseFloat(lat), lng: parseFloat(lng) })
  }

  return (
    <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex gap-3">
        <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search product (e.g., iPhone 14)" className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 ring-blue-500" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input value={lat} onChange={(e)=>setLat(e.target.value)} placeholder="Latitude" className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 ring-blue-500" />
        <input value={lng} onChange={(e)=>setLng(e.target.value)} placeholder="Longitude" className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 ring-blue-500" />
        <div className="flex gap-2">
          <button type="button" onClick={useMyLocation} className="px-4 py-3 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition w-1/2">Use my location</button>
          <button type="submit" className="px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition w-1/2">Search</button>
        </div>
      </div>
    </form>
  )
}
