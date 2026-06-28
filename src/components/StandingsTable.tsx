import { Standing } from '@/lib/types'
import { getTeam } from '@/data/teams'

export default function StandingsTable({ standings, group }: { standings: Standing[]; group: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-800">
        <h3 className="text-sm font-bold text-yellow-400">Grup {group}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-500 text-xs">
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Tim</th>
              <th className="px-3 py-2 text-center">M</th>
              <th className="px-3 py-2 text-center">W</th>
              <th className="px-3 py-2 text-center">D</th>
              <th className="px-3 py-2 text-center">L</th>
              <th className="px-3 py-2 text-center">GF</th>
              <th className="px-3 py-2 text-center">GA</th>
              <th className="px-3 py-2 text-center">GD</th>
              <th className="px-3 py-2 text-center font-bold text-white">Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((s, i) => {
              const team = getTeam(s.team)
              return (
                <tr key={s.team} className={`border-b border-zinc-800/50 ${i < 2 ? 'bg-green-950/20' : ''}`}>
                  <td className="px-3 py-2.5 text-zinc-500">{i + 1}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{team?.flag}</span>
                      <span className="font-medium text-white">{team?.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-center text-zinc-300">{s.played}</td>
                  <td className="px-3 py-2.5 text-center text-green-400">{s.won}</td>
                  <td className="px-3 py-2.5 text-center text-yellow-400">{s.drawn}</td>
                  <td className="px-3 py-2.5 text-center text-red-400">{s.lost}</td>
                  <td className="px-3 py-2.5 text-center text-zinc-300">{s.goalsFor}</td>
                  <td className="px-3 py-2.5 text-center text-zinc-300">{s.goalsAgainst}</td>
                  <td className="px-3 py-2.5 text-center font-mono">{s.goalDiff > 0 ? `+${s.goalDiff}` : s.goalDiff}</td>
                  <td className="px-3 py-2.5 text-center font-bold text-yellow-400 text-base">{s.points}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
