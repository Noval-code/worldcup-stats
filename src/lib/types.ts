export interface Team {
  id: string
  name: string
  flag: string
  group: string
  coach: string
  rank: number
  players: Player[]
}

export interface Player {
  id: string
  name: string
  number: number
  position: 'GK' | 'DF' | 'MF' | 'FW'
  age: number
  nationality: string
  goals: number
  assists: number
  yellowCards: number
  redCards: number
  matchesPlayed: number
}

export interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  homeTeamName?: string
  awayTeamName?: string
  homeTeamFlag?: string
  awayTeamFlag?: string
  homeScore: number | null
  awayScore: number | null
  date: string
  time: string
  stadium: string
  stage: 'group' | 'round16' | 'quarter' | 'semi' | 'third' | 'final'
  group?: string
  status: 'upcoming' | 'live' | 'finished'
  events: MatchEvent[]
}

export interface MatchEvent {
  minute: number
  type: 'goal' | 'yellow' | 'red' | 'substitution' | 'penalty'
  player: string
  team: 'home' | 'away'
  detail?: string
}

export interface Standing {
  team: string
  teamName?: string
  teamFlag?: string
  group: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDiff: number
  points: number
}

export interface TopScorer {
  player: string
  team: string
  teamName?: string
  teamFlag?: string
  imageUrl?: string
  goals: number
  assists: number
  matchesPlayed: number
  penalty: boolean
}

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  category: 'news' | 'analysis' | 'interview'
}
