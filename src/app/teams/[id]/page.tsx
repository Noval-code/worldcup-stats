import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getTeam } from '@/data/teams'
import { matches } from '@/data/matches'
import { standings } from '@/data/standings'
import MatchCard from '@/components/MatchCard'

export default async function TeamDetailPage(props: PageProps<'/teams/[id]'>) {
  const { id } = await props.params
  const team = getTeam(id)
  if (!team) notFound()

  const standing = standings.find(s => s.team === id)
  const teamMatches = matches.filter(m => m.homeTeam === id || m.awayTeam === id)

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Link href="/teams" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Semua Tim
      </Link>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{team.flag}</span>
          <div>
            <h1 className="text-2xl font-bold text-white">{team.name}</h1>
            <div className="flex items-center gap-3 mt-1 text-sm text-zinc-500">
              <span>Grup {team.group}</span>
              <span>•</span>
              <span>Pelatih: {team.coach}</span>
              <span>•</span>
              <span>FIFA Rank: #{team.rank}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-3">Statistik Grup</h2>
          {standing ? (
            <div className="grid grid-cols-5 gap-4 text-center">
              {[
                { label: 'M', value: standing.played },
                { label: 'W', value: standing.won, color: 'text-green-400' },
                { label: 'D', value: standing.drawn, color: 'text-yellow-400' },
                { label: 'L', value: standing.lost, color: 'text-red-400' },
                { label: 'Pts', value: standing.points, color: 'text-yellow-400' },
              ].map(s => (
                <div key={s.label}>
                  <p className={`text-xl font-bold ${s.color || 'text-white'}`}>{s.value}</p>
                  <p className="text-[10px] text-zinc-600">{s.label}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-600 text-sm">Belum ada data</p>
          )}
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-3">Gol</h2>
          {standing ? (
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-green-400">{standing.goalsFor}</p>
                <p className="text-[10px] text-zinc-600">Gol Dicetak</p>
              </div>
              <div>
                <p className="text-xl font-bold text-red-400">{standing.goalsAgainst}</p>
                <p className="text-[10px] text-zinc-600">Gol Kebobolan</p>
              </div>
            </div>
          ) : (
            <p className="text-zinc-600 text-sm">Belum ada data</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-white mb-4">Pertandingan</h2>
        <div className="space-y-3">
          {teamMatches.length === 0 ? (
            <p className="text-zinc-600 text-sm">Belum ada pertandingan</p>
          ) : (
            teamMatches.map(m => <MatchCard key={m.id} match={m} />)
          )}
        </div>
      </div>
    </div>
  )
}
