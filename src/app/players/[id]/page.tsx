import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Goal } from 'lucide-react'
import { getPlayer } from '@/data/players'
import { getAllMatches, resolveTeamName } from '@/lib/data-service'
import { getPlayerImage } from '@/lib/player-images'
import type { Match, MatchEvent } from '@/lib/types'

const positionLabels: Record<string, string> = {
  GK: 'Kiper', DF: 'Bek', MF: 'Gelandang', FW: 'Penyerang',
}

function getSurname(name: string): string {
  const parts = name.trim().split(/\s+/)
  return parts[parts.length - 1].toLowerCase()
}

function isPlayerMatch(eventName: string, playerName: string): boolean {
  const a = eventName.toLowerCase()
  const b = playerName.toLowerCase()
  if (a === b) return true
  if (a.includes(b) || b.includes(a)) return true
  if (getSurname(eventName) === getSurname(playerName) && getSurname(eventName).length > 2) return true
  return false
}

export default async function PlayerDetailPage(props: PageProps<'/players/[id]'>) {
  const { id } = await props.params
  const player = getPlayer(id)
  if (!player) notFound()

  const [matches, imageUrl] = await Promise.all([
    getAllMatches(),
    getPlayerImage(player.name),
  ])

  const goalEntries: { match: Match; event: MatchEvent }[] = []
  let detectedTeamId: string | null = null

  for (const m of matches) {
    if (!m.events?.length) continue
    for (const e of m.events) {
      if (e.type === 'goal' && isPlayerMatch(e.player, player.name)) {
        goalEntries.push({ match: m, event: e })
        if (!detectedTeamId) {
          detectedTeamId = e.team === 'home' ? m.homeTeam : m.awayTeam
        }
      }
    }
  }

  const realGoals = goalEntries.length
  const teamInfo = detectedTeamId ? resolveTeamName(detectedTeamId) : null

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link href="/teams" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-zinc-800 flex-shrink-0 overflow-hidden mx-auto">
            {imageUrl ? (
              <img src={imageUrl} alt={player.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-zinc-600">
                {player.name.charAt(0)}
              </div>
            )}
          </div>
          <h1 className="text-xl font-bold text-white mt-3">{player.name}</h1>
          <p className="text-sm text-zinc-500">
            {positionLabels[player.position]} &bull; #{player.number}
            {teamInfo && <> &bull; {teamInfo.flag.startsWith('http') ? (
              <img src={teamInfo.flag} alt="" className="w-4 h-3 inline ml-1 align-middle" />
            ) : (
              <span>{teamInfo.flag}</span>
            )} {teamInfo.name}</>}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Usia', value: player.age },
            { label: 'Kebangsaan', value: player.nationality },
            { label: 'Pertandingan', value: player.matchesPlayed },
            { label: 'Gol', value: realGoals || player.goals },
          ].map(s => (
            <div key={s.label} className="bg-zinc-800/50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-white">{s.value}</p>
              <p className="text-[10px] text-zinc-600">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center bg-zinc-800/30 rounded-lg px-4 py-3">
            <span className="text-sm text-zinc-400">Assist</span>
            <span className="text-sm font-semibold text-white">{player.assists}</span>
          </div>
          <div className="flex justify-between items-center bg-zinc-800/30 rounded-lg px-4 py-3">
            <span className="text-sm text-zinc-400">Kartu Kuning</span>
            <span className="text-sm font-semibold text-yellow-400">{player.yellowCards}</span>
          </div>
          <div className="flex justify-between items-center bg-zinc-800/30 rounded-lg px-4 py-3">
            <span className="text-sm text-zinc-400">Kartu Merah</span>
            <span className="text-sm font-semibold text-red-400">{player.redCards}</span>
          </div>
        </div>

        {goalEntries.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Goal className="w-4 h-4 text-yellow-400" /> Daftar Gol ({realGoals})
            </h2>
            <div className="space-y-2">
              {goalEntries
                .sort((a, b) => {
                  const da = new Date(`${a.match.date}T${a.match.time || '00:00'}`).getTime()
                  const db = new Date(`${b.match.date}T${b.match.time || '00:00'}`).getTime()
                  return db - da
                })
                .map((g, i) => {
                  const oppTeamId = g.event.team === 'home' ? g.match.awayTeam : g.match.homeTeam
                  const oppTeam = resolveTeamName(oppTeamId)
                  return (
                    <Link key={i} href={`/matches/${g.match.id}`} className="flex items-center gap-3 bg-zinc-800/30 rounded-lg px-4 py-3 hover:bg-zinc-800/50 transition-colors">
                      <span className="text-xs font-bold text-yellow-400 w-8 text-center">{g.event.minute}&apos;</span>
                      <span className="text-sm text-zinc-300">vs {oppTeam.name}</span>
                      <span className="text-xs text-zinc-600 ml-auto">{g.match.date}</span>
                    </Link>
                  )
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
