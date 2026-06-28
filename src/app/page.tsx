import { Calendar, Trophy, Users, Goal } from 'lucide-react'
import MatchCard from '@/components/MatchCard'
import StandingsTable from '@/components/StandingsTable'
import NewsCard from '@/components/NewsCard'
import { matches } from '@/data/matches'
import { standings, groups } from '@/data/standings'
import { topScorers } from '@/data/topscorers'
import { news } from '@/data/news'
import Link from 'next/link'

export default function Home() {
  const liveMatches = matches.filter(m => m.status === 'live')
  const recentMatches = matches.filter(m => m.status === 'finished').slice(-3).reverse()
  const upcomingMatches = matches.filter(m => m.status === 'upcoming').slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 via-zinc-900 to-zinc-950 border border-zinc-800 p-8 md:p-12">
        <div className="relative z-10">
          <span className="text-xs font-semibold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full">Piala Dunia 2026</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 leading-tight">
            USA • Canada • Mexico
          </h1>
          <p className="text-zinc-400 mt-2 max-w-xl">
            Pantau semua statistik, jadwal, klasemen, dan berita terbaru Piala Dunia 2026
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
          {recentMatches.map(m => <MatchCard key={m.id} match={m} />)}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-400" /> Pertandingan Mendatang</h2>
          <Link href="/matches" className="text-xs text-yellow-400 hover:underline">Lihat semua</Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {upcomingMatches.map(m => <MatchCard key={m.id} match={m} />)}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2"><Users className="w-5 h-5 text-yellow-400" /> Klasemen Grup</h2>
          <Link href="/standings" className="text-xs text-yellow-400 hover:underline">Lihat semua</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {groups.slice(0, 4).map(g => (
            <StandingsTable key={g} standings={standings.filter(s => s.group === g).sort((a, b) => b.points - a.points)} group={g} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2"><Goal className="w-5 h-5 text-yellow-400" /> Top Skor</h2>
          <Link href="/top-scorers" className="text-xs text-yellow-400 hover:underline">Lihat semua</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topScorers.slice(0, 4).map((s, i) => (
            <div key={s.player} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-3">
              <span className="text-lg font-bold text-zinc-600">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{s.player}</p>
                <p className="text-xs text-zinc-500">{s.team}</p>
              </div>
              <p className="text-2xl font-bold text-yellow-400">{s.goals}</p>
            </div>
          ))}
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
