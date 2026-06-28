import { Player } from '@/lib/types'

export const players: Player[] = [
  { id: 'p1', name: 'Lionel Messi', number: 10, position: 'FW', age: 38, nationality: 'Argentina', goals: 3, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2 },
  { id: 'p2', name: 'Cristiano Ronaldo', number: 7, position: 'FW', age: 41, nationality: 'Portugal', goals: 2, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2 },
  { id: 'p3', name: 'Kylian Mbappé', number: 10, position: 'FW', age: 27, nationality: 'France', goals: 2, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2 },
  { id: 'p4', name: 'Harry Kane', number: 9, position: 'FW', age: 32, nationality: 'England', goals: 2, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1 },
  { id: 'p5', name: 'Vinícius Jr.', number: 20, position: 'FW', age: 25, nationality: 'Brazil', goals: 2, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 2 },
  { id: 'p6', name: 'Neymar Jr.', number: 10, position: 'FW', age: 34, nationality: 'Brazil', goals: 1, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2 },
  { id: 'p7', name: 'Jude Bellingham', number: 10, position: 'MF', age: 23, nationality: 'England', goals: 1, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 1 },
  { id: 'p8', name: 'Lamine Yamal', number: 19, position: 'FW', age: 18, nationality: 'Spain', goals: 1, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 1 },
  { id: 'p9', name: 'Alphonso Davies', number: 19, position: 'DF', age: 25, nationality: 'Canada', goals: 1, assists: 2, yellowCards: 0, redCards: 0, matchesPlayed: 2 },
  { id: 'p10', name: 'Jonathan David', number: 20, position: 'FW', age: 26, nationality: 'Canada', goals: 2, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2 },
  { id: 'p11', name: 'Sadio Mané', number: 10, position: 'FW', age: 34, nationality: 'Senegal', goals: 1, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 2 },
  { id: 'p12', name: 'Federico Valverde', number: 15, position: 'MF', age: 27, nationality: 'Uruguay', goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1 },
]

export function getPlayer(id: string): Player | undefined {
  return players.find(p => p.id === id)
}
