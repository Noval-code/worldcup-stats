import { teams } from '@/data/teams'
import Link from 'next/link'

export default function TeamsPage() {
  const groups = [...new Set(teams.map(t => t.group))].sort()

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-6">Tim Peserta</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {groups.map(g => (
          <div key={g}>
            <h2 className="text-sm font-bold text-yellow-400 mb-3">Grup {g}</h2>
            <div className="space-y-2">
              {teams.filter(t => t.group === g).map(team => (
                <Link
                  key={team.id}
                  href={`/teams/${team.id}`}
                  className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-3 hover:bg-zinc-800 transition-colors"
                >
                  <span className="text-2xl">{team.flag}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{team.name}</p>
                    <p className="text-[10px] text-zinc-600">FIFA Rank: #{team.rank}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
