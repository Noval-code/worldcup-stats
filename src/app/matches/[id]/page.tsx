import { notFound } from 'next/navigation'
import { getOneMatch, resolveTeamName } from '@/lib/data-service'
import MatchTimeline from '@/components/MatchTimeline'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const stageLabels: Record<string, string> = {
  group: 'Fase Grup',
  round16: '16 Besar',
  quarter: 'Perempat Final',
  semi: 'Semifinal',
  third: 'Perebutan Juara 3',
  final: 'Final',
}

export default async function MatchDetailPage(props: PageProps<'/matches/[id]'>) {
  const { id } = await props.params
  const match = await getOneMatch(id)
  if (!match) notFound()

  const home = resolveTeamName(match.homeTeam)
  const away = resolveTeamName(match.awayTeam)
  const isFinished = match.status === 'finished'
  const isLive = match.status === 'live'

  function TeamFlag({ flag }: { flag: string }) {
    if (flag.startsWith('http')) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={flag} alt="" className="w-16 h-12 md:w-20 md:h-14 object-cover rounded-lg inline-block" />
    }
    return <span className="text-5xl md:text-6xl">{flag}</span>
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link href="/matches" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
        <div className="text-center mb-6">
          <span className="text-xs text-zinc-500 font-medium">
            {stageLabels[match.stage]}{match.group ? ` • Grup ${match.group}` : ''}
          </span>
          <div className="flex items-center justify-center gap-2 mt-1">
            {isLive && <span className="flex items-center gap-1 text-xs text-green-400 font-semibold"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />LIVE</span>}
            {isFinished && <span className="text-xs text-zinc-500">{match.date}</span>}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-12 py-8">
          <div className="text-center">
            <TeamFlag flag={home.flag} />
            <p className="text-sm font-semibold text-white mt-2">{home.name}</p>
          </div>
          <div className="text-center">
            {isFinished || isLive ? (
              <div className={`text-5xl md:text-6xl font-bold tabular-nums ${isLive ? 'text-green-400' : 'text-white'}`}>
                {match.homeScore} - {match.awayScore}
              </div>
            ) : (
              <div className="text-2xl text-zinc-600">
                <div className="text-xs font-semibold text-zinc-500">{match.date}</div>
                <div className="text-lg text-zinc-400 mt-1">{match.time}</div>
              </div>
            )}
          </div>
          <div className="text-center">
            <TeamFlag flag={away.flag} />
            <p className="text-sm font-semibold text-white mt-2">{away.name}</p>
          </div>
        </div>

        {match.status === 'upcoming' && (
          <div className="text-center text-sm text-zinc-500 mt-2">
            {match.stadium}
          </div>
        )}
      </div>

      <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-sm font-bold text-white mb-4">Timeline Pertandingan</h2>
        <MatchTimeline events={match.events} homeTeam={match.homeTeam} awayTeam={match.awayTeam} />
      </div>
    </div>
  )
}
