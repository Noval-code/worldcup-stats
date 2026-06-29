import { Match, Standing, Team, TopScorer, NewsItem } from './types'

const API_BASE = 'https://worldcup26.ir'

async function fetchJSON(url: string) {
  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function getAPITeams(): Promise<Map<string, Team>> {
  const data = await fetchJSON(`${API_BASE}/get/teams`)
  if (!data?.teams) return new Map()

  const teams: Team[] = data.teams.map((t: any) => ({
    id: t.id,
    name: t.name_en,
    flag: t.flag,
    group: t.groups,
    coach: '',
    rank: 0,
    players: [],
  }))

  return new Map(teams.map(t => [t.id, t]))
}

export async function getAPIMatches(): Promise<Match[]> {
  const data = await fetchJSON(`${API_BASE}/get/games`)
  if (!data?.games) return []

  const teams = await getAPITeams()
  const stadiums = await getAPIStadiums()

  return data.games.map((g: any) => {
    const isFinished = g.finished === 'TRUE'
    const isLive = g.time_elapsed && g.time_elapsed !== 'finished' && g.time_elapsed !== 'notstarted'
    const status: 'upcoming' | 'live' | 'finished' = isFinished ? 'finished' : isLive ? 'live' : 'upcoming'

    const stadium = stadiums.get(g.stadium_id)

    let homeTeamId = g.home_team_id
    let awayTeamId = g.away_team_id
    if (homeTeamId === '0' || awayTeamId === '0') {
      homeTeamId = g.home_team_label ? `label_${g.home_team_label.replace(/\s+/g, '_')}` : 'TBD'
      awayTeamId = g.away_team_label ? `label_${g.away_team_label.replace(/\s+/g, '_')}` : 'TBD'
    }

    const homeTeam = teams.get(g.home_team_id)
    const awayTeam = teams.get(g.away_team_id)

    const events = buildEvents(g)

    return {
      id: g.id,
      homeTeam: homeTeamId,
      awayTeam: awayTeamId,
      homeTeamName: homeTeam?.name || g.home_team_name_en || g.home_team_label?.replace('_', ' ') || 'TBD',
      awayTeamName: awayTeam?.name || g.away_team_name_en || g.away_team_label?.replace('_', ' ') || 'TBD',
      homeTeamFlag: homeTeam?.flag || '',
      awayTeamFlag: awayTeam?.flag || '',
      homeScore: g.home_score !== null ? Number(g.home_score) : null,
      awayScore: g.away_score !== null ? Number(g.away_score) : null,
      date: g.local_date?.split(' ')[0] || '',
      time: g.local_date?.split(' ')[1] || '',
      stadium: stadium?.name_en || '',
      stage: mapStage(g.type),
      group: g.group && g.group.startsWith('R') ? undefined : g.group,
      status,
      events,
    } as Match
  })
}

export async function getAPIStandings(): Promise<Standing[]> {
  const data = await fetchJSON(`${API_BASE}/get/groups`)
  if (!data?.groups) return []

  const teams = await getAPITeams()

  const result: Standing[] = []
  for (const group of data.groups) {
    for (const t of group.teams) {
      const team = teams.get(t.team_id)
      result.push({
        team: t.team_id,
        teamName: team?.name || '',
        teamFlag: team?.flag || '',
        group: group.name,
        played: Number(t.mp),
        won: Number(t.w),
        drawn: Number(t.d),
        lost: Number(t.l),
        goalsFor: Number(t.gf),
        goalsAgainst: Number(t.ga),
        goalDiff: Number(t.gd),
        points: Number(t.pts),
      })
    }
  }
  return result
}

function normalizeName(name: string): string {
  let n = name.trim()
  n = n.replace(/\s+/g, ' ')
  const parts = n.split(' ')
  if (parts.length >= 2 && parts[0].endsWith('.')) {
    parts.shift()
    n = parts.join(' ')
  }
  return n
}

function getSurname(name: string): string {
  const parts = name.trim().split(/\s+/)
  return parts[parts.length - 1].toLowerCase()
}

function isSimilar(a: string, b: string): boolean {
  const aNorm = normalizeName(a).toLowerCase()
  const bNorm = normalizeName(b).toLowerCase()
  if (aNorm === bNorm) return true
  if (aNorm.includes(bNorm) || bNorm.includes(aNorm)) return true
  if (getSurname(a) === getSurname(b) && getSurname(a).length > 2) return true
  return false
}

export async function getAPITopScorers(): Promise<TopScorer[]> {
  const matches = await getAPIMatches()
  const scorerEntries: { name: string; team: string; penalty: boolean; matchId: string }[] = []

  for (const m of matches) {
    if (!m.events?.length) continue
    for (const e of m.events) {
      if (e.type !== 'goal') continue
      const teamId = e.team === 'home' ? m.homeTeam : m.awayTeam
      scorerEntries.push({
        name: e.player.trim(),
        team: teamId,
        penalty: e.detail?.toLowerCase().includes('penalty') || false,
        matchId: m.id,
      })
    }
  }

  const merged = new Map<string, { goals: number; matches: Set<string>; penalty: boolean; team: string }>()

  for (const entry of scorerEntries) {
    let foundKey: string | null = null
    for (const key of merged.keys()) {
      if (isSimilar(key, entry.name)) {
        foundKey = key
        break
      }
    }
    const useKey = foundKey || entry.name
    if (!merged.has(useKey)) {
      merged.set(useKey, { goals: 0, matches: new Set(), penalty: false, team: entry.team })
    }
    const s = merged.get(useKey)!
    s.goals++
    s.matches.add(entry.matchId)
    if (entry.penalty) s.penalty = true
    if (entry.name.length > useKey.length) {
      merged.delete(useKey)
      merged.set(entry.name, s)
    }
  }

  return Array.from(merged.entries())
    .map(([player, stats]) => ({
      player,
      team: stats.team,
      teamName: '',
      teamFlag: '',
      goals: stats.goals,
      assists: 0,
      matchesPlayed: stats.matches.size,
      penalty: stats.penalty,
    }))
    .sort((a, b) => b.goals - a.goals || b.matchesPlayed - a.matchesPlayed)
    .slice(0, 50)
}

async function getAPIStadiums(): Promise<Map<string, { name_en: string }>> {
  const data = await fetchJSON(`${API_BASE}/get/stadiums`)
  if (!data?.stadiums) return new Map()
  return new Map(data.stadiums.map((s: any) => [s.id, { name_en: s.name_en }]))
}

function mapStage(type: string): Match['stage'] {
  const map: Record<string, Match['stage']> = {
    group: 'group',
    r32: 'round16',
    r16: 'round16',
    qf: 'quarter',
    sf: 'semi',
    third: 'third',
    final: 'final',
  }
  return map[type] || 'group'
}

function parseScorers(scorersStr: string): string[] {
  if (!scorersStr || scorersStr === 'null') return []
  try {
    const cleaned = scorersStr.replace(/[{}"]/g, '')
    return cleaned.split(',').map(s => s.trim()).filter(Boolean)
  } catch {
    return []
  }
}

function buildEvents(g: any): Match['events'] {
  const events: Match['events'] = []

  const homeScorers = parseScorers(g.home_scorers)
  const awayScorers = parseScorers(g.away_scorers)

  for (const scorer of homeScorers) {
    const match = scorer.match(/^(.+?)\s(\d+)\+?(\d*)'/)
    if (match) {
      const minute = Number(match[2]) + (match[3] ? Number(match[3]) : 0)
      events.push({
        minute,
        type: 'goal',
        player: match[1].trim(),
        team: 'home',
        detail: '',
      })
    }
  }

  for (const scorer of awayScorers) {
    const match = scorer.match(/^(.+?)\s(\d+)\+?(\d*)'/)
    if (match) {
      const minute = Number(match[2]) + (match[3] ? Number(match[3]) : 0)
      events.push({
        minute,
        type: 'goal',
        player: match[1].trim(),
        team: 'away',
        detail: '',
      })
    }
  }

  events.sort((a, b) => a.minute - b.minute)
  return events
}
