import { NewsItem } from '@/lib/types'

const categoryLabels: Record<string, string> = {
  news: 'Berita',
  analysis: 'Analisis',
  interview: 'Wawancara',
}

export default function NewsCard({ news }: { news: NewsItem }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:bg-zinc-800/80 transition-colors cursor-pointer">
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
          news.category === 'news' ? 'bg-blue-500/10 text-blue-400' :
          news.category === 'analysis' ? 'bg-purple-500/10 text-purple-400' :
          'bg-green-500/10 text-green-400'
        }`}>
          {categoryLabels[news.category]}
        </span>
        <span className="text-xs text-zinc-600">{news.date}</span>
      </div>
      <h3 className="text-sm font-semibold text-white mb-1.5 line-clamp-2">{news.title}</h3>
      <p className="text-xs text-zinc-500 line-clamp-2">{news.excerpt}</p>
    </div>
  )
}
