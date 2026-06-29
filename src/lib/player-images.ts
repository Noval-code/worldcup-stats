const cache = new Map<string, string>()

export async function getPlayerImage(name: string): Promise<string | null> {
  if (cache.has(name)) return cache.get(name)!

  try {
    const encoded = encodeURIComponent(name.replace(/\./g, '').trim())
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`

    const res = await fetch(url, {
      headers: { 'User-Agent': 'WorldCup2026Stats/1.0' },
      next: { revalidate: 86400 },
    })

    if (!res.ok) {
      cache.set(name, null!)
      return null
    }

    const data = await res.json()
    const image = data?.thumbnail?.source || null
    cache.set(name, image!)
    return image
  } catch {
    cache.set(name, null!)
    return null
  }
}

export function getPlayerImageSync(name: string): string | null {
  return cache.get(name) || null
}
