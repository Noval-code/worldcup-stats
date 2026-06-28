import { getTopScorers } from '@/lib/data-service'
import TopScorerCard from '@/components/TopScorerCard'

export default async function TopScorersPage() {
  const topScorers = await getTopScorers()
  const sorted = [...topScorers].sort((a, b) => b.goals - a.goals || b.assists - a.assists)

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-6">Top Skor Piala Dunia 2026</h1>
      {sorted.length === 0 ? (
        <p className="text-zinc-600 text-center py-12">Belum ada data top skor</p>
      ) : (
        <div className="space-y-2">
          {sorted.map((s, i) => (
            <TopScorerCard key={`${s.player}-${i}`} scorer={s} rank={i + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
