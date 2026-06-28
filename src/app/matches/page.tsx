'use client'

import { useState } from 'react'
import { matches } from '@/data/matches'
import MatchCard from '@/components/MatchCard'

const stages = [
  { key: 'all', label: 'Semua' },
  { key: 'upcoming', label: 'Mendatang' },
  { key: 'live', label: 'LIVE' },
  { key: 'finished', label: 'Selesai' },
]

export default function MatchesPage() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? matches : matches.filter(m => m.status === filter)

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-6">Jadwal & Hasil Pertandingan</h1>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {stages.map(s => (
          <button
            key={s.key}
            onClick={() => setFilter(s.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filter === s.key
                ? s.key === 'live' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-zinc-600 text-center py-12">Tidak ada pertandingan</p>
        ) : (
          filtered.map(m => <MatchCard key={m.id} match={m} />)
        )}
      </div>
    </div>
  )
}
