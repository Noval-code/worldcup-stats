import { MatchEvent } from '@/lib/types'

const eventIcons: Record<string, string> = {
  goal: '⚽',
  yellow: '🟨',
  red: '🟥',
  substitution: '🔄',
  penalty: '🎯',
}

export default function MatchTimeline({ events, homeTeam, awayTeam }: { events: MatchEvent[]; homeTeam: string; awayTeam: string }) {
  if (events.length === 0) return <p className="text-zinc-600 text-sm text-center py-4">Belum ada event</p>

  return (
    <div className="space-y-2">
      {events.map((event, i) => (
        <div key={i} className="flex items-center gap-3 text-sm">
          <span className="w-10 text-right text-zinc-500 font-mono text-xs">{event.minute}&apos;</span>
          <span className="text-base">{eventIcons[event.type] || '•'}</span>
          <span className={`font-medium ${event.team === 'home' ? 'text-white' : 'text-zinc-300'}`}>
            {event.player}
          </span>
          {event.detail && <span className="text-xs text-zinc-600">({event.detail})</span>}
        </div>
      ))}
    </div>
  )
}
