import { topScorers } from '@/data/topscorers'
import TopScorerCard from '@/components/TopScorerCard'

export default function TopScorersPage() {
  const sorted = [...topScorers].sort((a, b) => b.goals - a.goals || b.assists - a.assists)

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-6">Top Skor Piala Dunia 2026</h1>
      <div className="space-y-2">
        {sorted.map((s, i) => (
          <TopScorerCard key={s.player} scorer={s} rank={i + 1} />
        ))}
      </div>
    </div>
  )
}
