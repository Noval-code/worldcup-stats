'use client'

import { useState } from 'react'
import { news } from '@/data/news'
import NewsCard from '@/components/NewsCard'

const categories = [
  { key: 'all', label: 'Semua' },
  { key: 'news', label: 'Berita' },
  { key: 'analysis', label: 'Analisis' },
  { key: 'interview', label: 'Wawancara' },
]

export default function NewsPage() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? news : news.filter(n => n.category === filter)

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-6">Berita Piala Dunia</h1>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map(c => (
          <button
            key={c.key}
            onClick={() => setFilter(c.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filter === c.key ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.length === 0 ? (
          <p className="text-zinc-600 col-span-2 text-center py-12">Belum ada berita</p>
        ) : (
          filtered.map(n => <NewsCard key={n.id} news={n} />)
        )}
      </div>
    </div>
  )
}
