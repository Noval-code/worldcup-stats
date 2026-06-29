import { Match, Standing, TopScorer, NewsItem, Team } from './types'
import { getAPIMatches, getAPIStandings, getAPITopScorers, getAPITeams } from './api'
import { matches as staticMatches } from '@/data/matches'
import { standings as staticStandings } from '@/data/standings'
import { topScorers as staticTopScorers } from '@/data/topscorers'
import { teams as staticTeams } from '@/data/teams'
import { news } from '@/data/news'
import { getTeam } from '@/data/teams'
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

export async function getTopScorers(): Promise<TopScorer[]> {
  const api = await getAPITopScorers()
  if (api.length > 0) {
    const withImages = await Promise.all(
      api.map(async (s) => {
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

export function getNews(): NewsItem[] {
  return news
}

export function resolveTeamName(id: string): { name: string; flag: string } {
  const fromApi = apiTeams.get(id)
  if (fromApi) return { name: fromApi.name, flag: fromApi.flag }
  const fromStatic = getTeam(id)
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
