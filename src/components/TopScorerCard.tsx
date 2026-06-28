import { TopScorer } from '@/lib/types'
import { getTeam } from '@/data/teams'

export default function TopScorerCard({ scorer, rank }: { scorer: TopScorer; rank: number }) {
  const team = getTeam(scorer.team)
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4">
      <span className="text-lg font-bold text-zinc-600 w-6 text-center">{rank}</span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">{scorer.player}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-base">{team?.flag}</span>
          <span className="text-xs text-zinc-500">{team?.name}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-yellow-400">{scorer.goals}</p>
        <p className="text-[10px] text-zinc-600">Gol</p>
      </div>
      <div className="text-center hidden sm:block">
        <p className="text-lg font-semibold text-zinc-400">{scorer.assists}</p>
        <p className="text-[10px] text-zinc-600">Assist</p>
      </div>
      <div className="text-center hidden sm:block">
        <p className="text-lg font-semibold text-zinc-400">{scorer.matchesPlayed}</p>
        <p className="text-[10px] text-zinc-600">Main</p>
      </div>
      {scorer.penalty && <span className="text-[10px] text-zinc-600 bg-zinc-800 px-2 py-1 rounded-full">1 pen</span>}
    </div>
  )
}
