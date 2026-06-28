'use client'

import { useState } from 'react'
import { standings, groups } from '@/data/standings'
import StandingsTable from '@/components/StandingsTable'

export default function StandingsPage() {
  const [activeGroup, setActiveGroup] = useState('A')

  const filtered = standings.filter(s => s.group === activeGroup).sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff)

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-6">Klasemen Grup</h1>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {groups.map(g => (
          <button
            key={g}
            onClick={() => setActiveGroup(g)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeGroup === g ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800'
            }`}
          >
            Grup {g}
          </button>
        ))}
      </div>

      <StandingsTable standings={filtered} group={activeGroup} />

      <div className="mt-4 text-xs text-zinc-600">
        <p><span className="text-green-400">W</span> = Menang &nbsp; <span className="text-yellow-400">D</span> = Seri &nbsp; <span className="text-red-400">L</span> = Kalah &nbsp; <span className="text-zinc-400">GF/GA</span> = Gol For/Against &nbsp; <span className="text-zinc-400">GD</span> = Selisih Gol</p>
      </div>
    </div>
  )
}
