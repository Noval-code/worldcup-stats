import { Calendar, Trophy, Users, Goal } from 'lucide-react'
import MatchCard from '@/components/MatchCard'
import StandingsTable from '@/components/StandingsTable'
import TopScorerCard from '@/components/TopScorerCard'
import NewsCard from '@/components/NewsCard'
import { getAllMatches, getAllStandings, getTopScorers, getNews } from '@/lib/data-service'
import Link from 'next/link'

async function getGroups() {
  const standings = await getAllStandings()
  const groups = [...new Set(standings.map(s => s.group))].sort()
  return { standings, groups }
}

export default async function Home() {
  const [matches, { standings, groups }, topScorers, news] = await Promise.all([
    getAllMatches(),
    getGroups(),
    getTopScorers(),
    Promise.resolve(getNews()),
  ])

  const liveMatches = matches.filter(m => m.status === 'live')
  const recentMatches = matches
    .filter(m => m.status === 'finished')
    .sort((a, b) => {
      const parseDate = (d: string, t: string) => {
        const [m, day, y] = d.split('/')
        return new Date(`${y}-${m}-${day}T${t || '00:00'}`).getTime()
      }
      return parseDate(b.date, b.time) - parseDate(a.date, a.time)
    })
    .slice(0, 3)
  const upcomingMatches = matches
    .filter(m => m.status === 'upcoming')
    .sort((a, b) => {
      const parse = (d: string, t: string) => {
        const [m, day, y] = d.split('/')
        return new Date(`${y}-${m}-${day}T${t || '00:00'}`).getTime()
      }
      return parse(a.date, a.time) - parse(b.date, b.time)
    })
    .slice(0, 3)

  const topGroups = groups.slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 via-zinc-900 to-zinc-950 border border-zinc-800 p-8 md:p-12">
        <div className="relative z-10">
          <span className="text-xs font-semibold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full">Piala Dunia 2026</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 leading-tight">
            USA 🇺🇸 • Canada 🇨🇦 • Mexico 🇲🇽
          </h1>
          <p className="text-zinc-400 mt-2 max-w-xl">
            Pantau semua statistik, jadwal, klasemen, dan berita terbaru Piala Dunia 2026 — data real-time
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link href="/matches" className="bg-yellow-400 text-black font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-yellow-300 transition-colors">
              Lihat Jadwal
            </Link>
            <Link href="/standings" className="bg-zinc-800 text-zinc-300 font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-zinc-700 transition-colors">
              Klasemen
            </Link>
          </div>
        </div>
      </section>

      {liveMatches.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <h2 className="text-lg font-bold text-white">Pertandingan Sedang Berlangsung</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {liveMatches.map(m => <MatchCard key={m.id} match={m} />)}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2"><Calendar className="w-5 h-5 text-yellow-400" /> Pertandingan Terbaru</h2>
          <Link href="/matches" className="text-xs text-yellow-400 hover:underline">Lihat semua</Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {recentMatches.length > 0 ? recentMatches.map(m => <MatchCard key={m.id} match={m} />) : (
            <p className="text-zinc-600 text-sm col-span-3 text-center py-8">Belum ada pertandingan selesai</p>
          )}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-400" /> Pertandingan Mendatang</h2>
          <Link href="/matches" className="text-xs text-yellow-400 hover:underline">Lihat semua</Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {upcomingMatches.length > 0 ? upcomingMatches.map(m => <MatchCard key={m.id} match={m} />) : (
            <p className="text-zinc-600 text-sm col-span-3 text-center py-8">Tidak ada pertandingan</p>
          )}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2"><Users className="w-5 h-5 text-yellow-400" /> Klasemen Grup</h2>
          <Link href="/standings" className="text-xs text-yellow-400 hover:underline">Lihat semua</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {topGroups.map(g => (
            <StandingsTable key={g} standings={standings.filter(s => s.group === g).sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff)} group={g} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2"><Goal className="w-5 h-5 text-yellow-400" /> Top Skor</h2>
          <Link href="/top-scorers" className="text-xs text-yellow-400 hover:underline">Lihat semua</Link>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {topScorers.slice(0, 4).map((s, i) => (
            <TopScorerCard key={s.player} scorer={s} rank={i + 1} />
          ))}
          {topScorers.length === 0 && <p className="text-zinc-600 text-sm col-span-4 text-center py-8">Belum ada data</p>}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Berita Terbaru</h2>
          <Link href="/news" className="text-xs text-yellow-400 hover:underline">Lihat semua</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {news.slice(0, 3).map(n => <NewsCard key={n.id} news={n} />)}
        </div>
      </section>
    </div>
  )
}
