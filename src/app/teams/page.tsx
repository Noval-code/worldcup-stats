import Link from 'next/link'

interface APITeam {
  id: string
  name_en: string
  flag: string
  groups: string
  fifa_code: string
}

async function getTeams(): Promise<APITeam[]> {
  try {
    const res = await fetch('https://worldcup26.ir/get/teams', { next: { revalidate: 300 } })
    const data = await res.json()
    if (data?.teams) return data.teams
  } catch {}
  const { teams } = await import('@/data/teams')
  return teams.map(t => ({ id: t.id, name_en: t.name, flag: t.flag, groups: t.group, fifa_code: t.id.toUpperCase() }))
}

export default async function TeamsPage() {
  const teams = await getTeams()
  const groupList = [...new Set(teams.map(t => t.groups))].sort()

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-6">Tim Peserta (48 Tim)</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {groupList.map(g => (
          <div key={g}>
            <h2 className="text-sm font-bold text-yellow-400 mb-3">Grup {g}</h2>
            <div className="space-y-2">
              {teams.filter(t => t.groups === g).map(team => (
                <Link
                  key={team.id}
                  href={`/teams/${team.id}`}
                  className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-3 hover:bg-zinc-800 transition-colors"
                >
                  {team.flag.startsWith('http') ? (
                    <img src={team.flag} alt="" className="w-8 h-6 object-cover rounded" />
                  ) : (
                    <span className="text-2xl">{team.flag}</span>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-white">{team.name_en}</p>
                    <p className="text-[10px] text-zinc-600">{team.fifa_code}</p>
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
