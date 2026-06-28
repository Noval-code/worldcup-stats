import { Team } from '@/lib/types'

export const teams: Team[] = [
  { id: 'bra', name: 'Brazil', flag: '🇧🇷', group: 'A', coach: 'Dorival Jr.', rank: 5, players: [] },
  { id: 'ned', name: 'Netherlands', flag: '🇳🇱', group: 'A', coach: 'R. Koeman', rank: 7, players: [] },
  { id: 'sen', name: 'Senegal', flag: '🇸🇳', group: 'A', coach: 'A. Cissé', rank: 18, players: [] },
  { id: 'qat', name: 'Qatar', flag: '🇶🇦', group: 'A', coach: 'T. Marquez', rank: 51, players: [] },
  { id: 'arg', name: 'Argentina', flag: '🇦🇷', group: 'B', coach: 'L. Scaloni', rank: 1, players: [] },
  { id: 'mex', name: 'Mexico', flag: '🇲🇽', group: 'B', coach: 'J. Lozano', rank: 12, players: [] },
  { id: 'por', name: 'Portugal', flag: '🇵🇹', group: 'B', coach: 'R. Martínez', rank: 6, players: [] },
  { id: 'ksa', name: 'Saudi Arabia', flag: '🇸🇦', group: 'B', coach: 'R. Mancini', rank: 56, players: [] },
  { id: 'fra', name: 'France', flag: '🇫🇷', group: 'C', coach: 'D. Deschamps', rank: 2, players: [] },
  { id: 'jpn', name: 'Japan', flag: '🇯🇵', group: 'C', coach: 'H. Moriyasu', rank: 17, players: [] },
  { id: 'can', name: 'Canada', flag: '🇨🇦', group: 'C', coach: 'J. Herdman', rank: 49, players: [] },
  { id: 'tun', name: 'Tunisia', flag: '🇹🇳', group: 'C', coach: 'J. Kadri', rank: 30, players: [] },
  { id: 'eng', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'D', coach: 'G. Southgate', rank: 4, players: [] },
  { id: 'cro', name: 'Croatia', flag: '🇭🇷', group: 'D', coach: 'Z. Dalić', rank: 10, players: [] },
  { id: 'usa', name: 'USA', flag: '🇺🇸', group: 'D', coach: 'G. Berhalter', rank: 11, players: [] },
  { id: 'cmr', name: 'Cameroon', flag: '🇨🇲', group: 'D', coach: 'R. Song', rank: 42, players: [] },
  { id: 'esp', name: 'Spain', flag: '🇪🇸', group: 'E', coach: 'L. de la Fuente', rank: 3, players: [] },
  { id: 'ger', name: 'Germany', flag: '🇩🇪', group: 'E', coach: 'J. Nagelsmann', rank: 16, players: [] },
  { id: 'kor', name: 'South Korea', flag: '🇰🇷', group: 'E', coach: 'H. Hwangbo', rank: 23, players: [] },
  { id: 'australia', name: 'Australia', flag: '🇦🇺', group: 'E', coach: 'G. Arnold', rank: 39, players: [] },
  { id: 'bel', name: 'Belgium', flag: '🇧🇪', group: 'F', coach: 'D. Tedesco', rank: 8, players: [] },
  { id: 'uru', name: 'Uruguay', flag: '🇺🇾', group: 'F', coach: 'M. Bielsa', rank: 14, players: [] },
  { id: 'mex2', name: 'Morocco', flag: '🇲🇦', group: 'F', coach: 'W. Regragui', rank: 13, players: [] },
  { id: 'irn', name: 'Iran', flag: '🇮🇷', group: 'F', coach: 'A. Ghalenoei', rank: 21, players: [] },
  { id: 'ita', name: 'Italy', flag: '🇮🇹', group: 'G', coach: 'L. Spalletti', rank: 9, players: [] },
  { id: 'den', name: 'Denmark', flag: '🇩🇰', group: 'G', coach: 'K. Hjulmand', rank: 19, players: [] },
  { id: 'nga', name: 'Nigeria', flag: '🇳🇬', group: 'G', coach: 'J. Peseiro', rank: 40, players: [] },
  { id: 'ecu', name: 'Ecuador', flag: '🇪🇨', group: 'G', coach: 'F. Sánchez', rank: 36, players: [] },
  { id: 'sui', name: 'Switzerland', flag: '🇨🇭', group: 'H', coach: 'M. Yakin', rank: 15, players: [] },
  { id: 'col', name: 'Colombia', flag: '🇨🇴', group: 'H', coach: 'N. Lorenzo', rank: 20, players: [] },
  { id: 'srb', name: 'Serbia', flag: '🇷🇸', group: 'H', coach: 'D. Stojković', rank: 33, players: [] },
  { id: 'jor', name: 'Jordan', flag: '🇯🇴', group: 'H', coach: 'H. Ammouta', rank: 68, players: [] },
]

export const teamMap = new Map(teams.map(t => [t.id, t]))

export function getTeam(id: string): Team | undefined {
  return teamMap.get(id)
}
