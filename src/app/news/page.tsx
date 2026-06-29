import Link from 'next/link'
import { getNews } from '@/lib/data-service'
import NewsCard from '@/components/NewsCard'

const categories = [
  { key: 'all', label: 'Semua' },
  { key: 'news', label: 'Berita' },
  { key: 'analysis', label: 'Analisis' },
]

export default async function NewsPage(props: { searchParams?: Promise<{ cat?: string }> }) {
  const searchParams = await props.searchParams
  const cat = searchParams?.cat || 'all'
  const allNews = await getNews()

  const filtered = cat === 'all' ? allNews : allNews.filter(n => n.category === cat)

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-6">Berita Piala Dunia</h1>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map(c => (
          <Link
            key={c.key}
            href={c.key === 'all' ? '/news' : `/news?cat=${c.key}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              cat === c.key ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800'
            }`}
          >
            {c.label}
          </Link>
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
