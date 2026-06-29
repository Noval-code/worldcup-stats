import { Match, Standing, TopScorer, NewsItem, Team } from './types'
import { getAPIMatches, getAPIStandings, getAPITopScorers, getAPITeams } from './api'
import { matches as staticMatches } from '@/data/matches'
import { standings as staticStandings } from '@/data/standings'
import { topScorers as staticTopScorers } from '@/data/topscorers'
import { teams as staticTeams } from '@/data/teams'
import { news } from '@/data/news'
import { getTeam as getStaticTeam } from '@/data/teams'
import { getPlayerImage } from './player-images'

let apiTeams: Map<string, Team> = new Map()

export async function getAllMatches(): Promise<Match[]> {
  const api = await getAPIMatches()
  if (api.length > 0) {
    const teams = await getAPITeams()
    apiTeams = teams
    return api
  }
  return staticMatches
}

export async function getOneMatch(id: string): Promise<Match | undefined> {
  const all = await getAllMatches()
  return all.find(m => m.id === id)
}

export async function getAllStandings(): Promise<Standing[]> {
  const api = await getAPIStandings()
  if (api.length > 0) return api
  return staticStandings
}

function stripAccents(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function normalizeForMatch(s: string): string {
  return stripAccents(s)
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/[^a-z ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getSurname(name: string): string {
  const parts = name.trim().split(/\s+/)
  return parts[parts.length - 1].toLowerCase()
}

function nameMatch(a: string, b: string): boolean {
  const na = normalizeForMatch(a)
  const nb = normalizeForMatch(b)
  if (na === nb) return true
  if (na.includes(nb) || nb.includes(na)) return true
  const sa = getSurname(na)
  const sb = getSurname(nb)
  if (sa === sb && sa.length > 2) return true
  return false
}

export async function getTopScorers(): Promise<TopScorer[]> {
  const api = await getAPITopScorers()
  if (api.length > 0) {
    const merged = staticTopScorers.map(st => {
      const apiMatch = api.find(a => nameMatch(a.player, st.player))
      return {
        ...st,
        goals: apiMatch?.goals ?? st.goals,
        team: apiMatch?.team ?? st.team,
        penalty: apiMatch?.penalty ?? st.penalty,
      }
    })

    for (const a of api) {
      const exists = merged.some(m => nameMatch(m.player, a.player))
      if (!exists) {
        merged.push({ ...a, assists: 0, matchesPlayed: a.matchesPlayed })
      }
    }

    merged.sort((a, b) => b.goals - a.goals || b.assists - a.assists || (b.matchesPlayed || 0) - (a.matchesPlayed || 0))

    const withImages = await Promise.all(
      merged.slice(0, 50).map(async (s) => {
        const img = await getPlayerImage(s.player)
        return { ...s, imageUrl: img || undefined }
      })
    )
    return withImages
  }
  const withImages = await Promise.all(
    staticTopScorers.map(async (s) => {
      const img = await getPlayerImage(s.player)
      return { ...s, imageUrl: img || undefined }
    })
  )
  return withImages
}

export async function getAllTeams(): Promise<Team[]> {
  if (apiTeams.size > 0) return Array.from(apiTeams.values())

  const api = await getAPITeams()
  if (api.size > 0) {
    apiTeams = api
    return Array.from(api.values())
  }

  const fromApi = await getAPITeams()
  if (fromApi.size > 0) {
    apiTeams = fromApi
    return Array.from(fromApi.values())
  }

  return staticTeams
}

export async function getOneTeam(id: string): Promise<Team | null> {
  const api = apiTeams
  if (api.size === 0) {
    const fresh = await getAPITeams()
    if (fresh.size > 0) {
      apiTeams = fresh
      const t = fresh.get(id)
      if (t) return t
    }
  } else {
    const t = api.get(id)
    if (t) return t
  }

  const s = getStaticTeam(id)
  if (s) {
    const t: Team = { ...s, players: s.players || [] }
    return t
  }

  return null
}

export async function getNews(): Promise<NewsItem[]> {
  const matches = await getAllMatches()
  const finished = matches.filter(m => m.status === 'finished')

  if (finished.length === 0) return news

  const generated: NewsItem[] = []

  for (const m of finished.slice(0, 20)) {
    const home = resolveTeamName(m.homeTeam)
    const away = resolveTeamName(m.awayTeam)

    generated.push({
      id: `nr-${m.id}`,
      title: `${home.name} ${m.homeScore}-${m.awayScore} ${away.name}`,
      excerpt: `${home.name} berhasil mengalahkan ${away.name} dengan skor ${m.homeScore}-${m.awayScore} di pertandingan ${m.stage === 'group' ? `Grup ${m.group}` : m.stage} Piala Dunia 2026.`,
      date: m.date,
      image: '',
      category: 'news',
    })

    if (m.events?.length) {
      const uniqueScorers = [...new Set(m.events.filter(e => e.type === 'goal').map(e => e.player))]
      for (const p of uniqueScorers.slice(0, 1)) {
        generated.push({
          id: `np-${m.id}-${p.replace(/\s+/g, '-')}`,
          title: `${p} Cetak Gol untuk ${home.name}`,
          excerpt: `${p} mencetak gol dalam kemenangan ${home.name} ${m.homeScore}-${m.awayScore} atas ${away.name} di Piala Dunia 2026.`,
          date: m.date,
          image: '',
          category: 'analysis',
        })
      }
    }
  }

  generated.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return generated
}

export function resolveTeamName(id: string): { name: string; flag: string } {
  const fromApi = apiTeams.get(id)
  if (fromApi) return { name: fromApi.name, flag: fromApi.flag }
  const fromStatic = getStaticTeam(id)
  if (fromStatic) return { name: fromStatic.name, flag: fromStatic.flag }

  const labels: Record<string, string> = {
    winnerA: 'Juara Grup A', runnerA: 'Runner-up Grup A',
    winnerB: 'Juara Grup B', runnerB: 'Runner-up Grup B',
    winnerC: 'Juara Grup C', runnerC: 'Runner-up Grup C',
    winnerD: 'Juara Grup D', runnerD: 'Runner-up Grup D',
    winnerE: 'Juara Grup E', runnerE: 'Runner-up Grup E',
    winnerF: 'Juara Grup F', runnerF: 'Runner-up Grup F',
    winnerG: 'Juara Grup G', runnerG: 'Runner-up Grup G',
    winnerH: 'Juara Grup H', runnerH: 'Runner-up Grup H',
    winnerR1: 'Pemenang 1', winnerR2: 'Pemenang 2',
    winnerR3: 'Pemenang 3', winnerR4: 'Pemenang 4',
    winnerR5: 'Pemenang 5', winnerR6: 'Pemenang 6',
    winnerR7: 'Pemenang 7', winnerR8: 'Pemenang 8',
    winnerQF1: 'Pemenang QF 1', winnerQF2: 'Pemenang QF 2',
    winnerQF3: 'Pemenang QF 3', winnerQF4: 'Pemenang QF 4',
    winnerSF1: 'Pemenang SF 1', winnerSF2: 'Pemenang SF 2',
    loserSF1: 'Kalah SF 1', loserSF2: 'Kalah SF 2',
  }

  const labelMatch = id.match(/^label_(.+)$/)
  if (labelMatch) return { name: labelMatch[1].replace(/_/g, ' '), flag: '🏳️' }
  return { name: labels[id] || 'TBD', flag: '🏳️' }
}
