import { TopScorer } from '@/lib/types'
import { getTeam } from '@/data/teams'

function resolveTeam(scorer: TopScorer): { name: string; flag: string } {
  if (scorer.teamName && scorer.teamFlag) return { name: scorer.teamName, flag: scorer.teamFlag }
  const team = getTeam(scorer.team)
  if (team) return { name: team.name, flag: team.flag }
  return { name: '', flag: '' }
}

export default function TopScorerCard({ scorer, rank }: { scorer: TopScorer; rank: number }) {
  const team = resolveTeam(scorer)

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex items-center gap-3">
      <span className={`text-sm font-bold w-5 text-center ${rank <= 3 ? 'text-yellow-400' : 'text-zinc-600'}`}>
        {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : rank}
      </span>

      <div className="w-10 h-10 rounded-full bg-zinc-800 flex-shrink-0 overflow-hidden">
        {scorer.imageUrl ? (
          <img src={scorer.imageUrl} alt={scorer.player} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm font-bold text-zinc-500">
            {scorer.player.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{scorer.player}</p>
        <div className="flex items-center gap-1 mt-0.5">
          {team.flag.startsWith('http') ? (
            <img src={team.flag} alt="" className="w-4 h-3 object-cover rounded" />
          ) : (
            <span className="text-sm">{team.flag}</span>
          )}
          <span className="text-xs text-zinc-500 truncate">{team.name}</span>
        </div>
      </div>

      <div className="text-center px-2">
        <p className="text-xl font-bold text-yellow-400">{scorer.goals}</p>
        <p className="text-[9px] text-zinc-600">Gol</p>
      </div>

      <div className="text-center px-2 hidden sm:block">
        <p className="text-sm font-semibold text-zinc-400">{scorer.assists}</p>
        <p className="text-[9px] text-zinc-600">Assist</p>
      </div>

      <div className="text-center px-2 hidden sm:block">
        <p className="text-sm font-semibold text-zinc-400">{scorer.matchesPlayed}</p>
        <p className="text-[9px] text-zinc-600">Main</p>
      </div>
    </div>
  )
}
