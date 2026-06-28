import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPlayer } from '@/data/players'

const positionLabels: Record<string, string> = {
  GK: 'Kiper', DF: 'Bek', MF: 'Gelandang', FW: 'Penyerang',
}

export default async function PlayerDetailPage(props: PageProps<'/players/[id]'>) {
  const { id } = await props.params
  const player = getPlayer(id)
  if (!player) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link href="/teams" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-zinc-600">
            {player.name.charAt(0)}
          </div>
          <h1 className="text-xl font-bold text-white mt-3">{player.name}</h1>
          <p className="text-sm text-zinc-500">{positionLabels[player.position]} • #{player.number}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Usia', value: player.age },
            { label: 'Kebangsaan', value: player.nationality },
            { label: 'Pertandingan', value: player.matchesPlayed },
            { label: 'Gol', value: player.goals },
          ].map(s => (
            <div key={s.label} className="bg-zinc-800/50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-white">{s.value}</p>
              <p className="text-[10px] text-zinc-600">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center bg-zinc-800/30 rounded-lg px-4 py-3">
            <span className="text-sm text-zinc-400">Assist</span>
            <span className="text-sm font-semibold text-white">{player.assists}</span>
          </div>
          <div className="flex justify-between items-center bg-zinc-800/30 rounded-lg px-4 py-3">
            <span className="text-sm text-zinc-400">Kartu Kuning</span>
            <span className="text-sm font-semibold text-yellow-400">{player.yellowCards}</span>
          </div>
          <div className="flex justify-between items-center bg-zinc-800/30 rounded-lg px-4 py-3">
            <span className="text-sm text-zinc-400">Kartu Merah</span>
            <span className="text-sm font-semibold text-red-400">{player.redCards}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
