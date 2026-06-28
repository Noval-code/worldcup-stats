import { Match } from '@/lib/types'
import { getTeam } from '@/data/teams'
import Link from 'next/link'

const stageLabels: Record<string, string> = {
  group: 'Fase Grup',
  round16: '16 Besar',
  quarter: 'Perempat Final',
  semi: 'Semifinal',
  third: 'Perebutan Juara 3',
  final: 'Final',
}

export default function MatchCard({ match }: { match: Match }) {
  const home = getTeam(match.homeTeam)
  const away = getTeam(match.awayTeam)

  const isLive = match.status === 'live'
  const isFinished = match.status === 'finished'
  const isUpcoming = match.status === 'upcoming'

  return (
    <Link href={`/matches/${match.id}`} className="block">
      <div className={`bg-zinc-900 border rounded-xl p-4 hover:bg-zinc-800/80 transition-colors ${
        isLive ? 'border-green-500/50 ring-1 ring-green-500/20' : 'border-zinc-800'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-zinc-500 font-medium">{stageLabels[match.stage]}{match.group ? ` - Grup ${match.group}` : ''}</span>
          <div className="flex items-center gap-2">
            {isLive && <span className="flex items-center gap-1 text-xs text-green-400 font-semibold"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />LIVE</span>}
            {isFinished && <span className="text-xs text-zinc-500">{match.date}</span>}
            {isUpcoming && <span className="text-xs text-zinc-500">{match.date} • {match.time}</span>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center justify-end gap-2 text-right">
            <span className="text-sm font-semibold text-white">{home?.name || match.homeTeam}</span>
            <span className="text-2xl">{home?.flag}</span>
          </div>

          <div className="flex items-center gap-2 px-4">
            {isFinished || isLive ? (
              <span className={`text-2xl font-bold tabular-nums ${isLive ? 'text-green-400' : 'text-white'}`}>
                {match.homeScore} - {match.awayScore}
              </span>
            ) : (
              <span className="text-sm text-zinc-500">vs</span>
            )}
          </div>

          <div className="flex-1 flex items-center gap-2">
            <span className="text-2xl">{away?.flag}</span>
            <span className="text-sm font-semibold text-white">{away?.name || match.awayTeam}</span>
          </div>
        </div>

        {isUpcoming && (
          <div className="mt-3 text-center">
            <span className="text-xs text-zinc-600">{match.stadium}</span>
          </div>
        )}

        {isLive && match.events.length > 0 && (
          <div className="mt-3 pt-3 border-t border-zinc-800">
            <div className="text-xs text-zinc-500">Event terakhir: {match.events[match.events.length - 1].minute}&apos; {match.events[match.events.length - 1].player}</div>
          </div>
        )}
      </div>
    </Link>
  )
}
