import { Match } from '@/lib/types'

export const matches: Match[] = [
  { id: 'm1', homeTeam: 'bra', awayTeam: 'qat', homeScore: 3, awayScore: 0, date: '2026-06-12', time: '17:00', stadium: 'Estadio Azteca', stage: 'group', group: 'A', status: 'finished', events: [
    { minute: 23, type: 'goal', player: 'Vinícius Jr.', team: 'home', detail: 'L. Paquetá assist' },
    { minute: 54, type: 'goal', player: 'Neymar Jr.', team: 'home', detail: 'Penalty' },
    { minute: 78, type: 'goal', player: 'Rodrygo', team: 'home', detail: 'Raphinha assist' },
  ]},
  { id: 'm2', homeTeam: 'ned', awayTeam: 'sen', homeScore: 2, awayScore: 0, date: '2026-06-12', time: '21:00', stadium: 'Rose Bowl', stage: 'group', group: 'A', status: 'finished', events: [
    { minute: 31, type: 'goal', player: 'M. Depay', team: 'home', detail: 'F. de Jong assist' },
    { minute: 67, type: 'goal', player: 'C. Gakpo', team: 'home', detail: 'D. Dumfries assist' },
  ]},
  { id: 'm3', homeTeam: 'arg', awayTeam: 'ksa', homeScore: 4, awayScore: 1, date: '2026-06-13', time: '16:00', stadium: 'MetLife Stadium', stage: 'group', group: 'B', status: 'finished', events: [
    { minute: 10, type: 'goal', player: 'L. Messi', team: 'home', detail: 'Penalty' },
    { minute: 28, type: 'goal', player: 'J. Álvarez', team: 'home', detail: 'Di María assist' },
    { minute: 45, type: 'goal', player: 'L. Messi', team: 'home', detail: 'Free kick' },
    { minute: 63, type: 'goal', player: 'A. Al-Ghamdi', team: 'away', detail: 'Al-Dawsari assist' },
    { minute: 82, type: 'goal', player: 'L. Martínez', team: 'home', detail: 'Molina assist' },
  ]},
  { id: 'm4', homeTeam: 'mex', awayTeam: 'por', homeScore: 1, awayScore: 2, date: '2026-06-13', time: '20:00', stadium: 'AT&T Stadium', stage: 'group', group: 'B', status: 'finished', events: [
    { minute: 15, type: 'goal', player: 'Cristiano Ronaldo', team: 'away', detail: 'B. Fernandes assist' },
    { minute: 42, type: 'goal', player: 'R. Jiménez', team: 'home', detail: 'Penalty' },
    { minute: 73, type: 'goal', player: 'J. Félix', team: 'away', detail: 'Cancelo assist' },
  ]},
  { id: 'm5', homeTeam: 'fra', awayTeam: 'tun', homeScore: 2, awayScore: 0, date: '2026-06-14', time: '17:00', stadium: 'Mercedes-Benz Stadium', stage: 'group', group: 'C', status: 'finished', events: [
    { minute: 19, type: 'goal', player: 'K. Mbappé', team: 'home', detail: 'Griezmann assist' },
    { minute: 65, type: 'goal', player: 'A. Griezmann', team: 'home', detail: 'T. Hernández assist' },
  ]},
  { id: 'm6', homeTeam: 'jpn', awayTeam: 'can', homeScore: 1, awayScore: 1, date: '2026-06-14', time: '20:00', stadium: 'BC Place', stage: 'group', group: 'C', status: 'finished', events: [
    { minute: 39, type: 'goal', player: 'T. Kubo', team: 'home', detail: 'Minamino assist' },
    { minute: 71, type: 'goal', player: 'J. David', team: 'away', detail: 'Davies assist' },
  ]},
  { id: 'm7', homeTeam: 'eng', awayTeam: 'cmr', homeScore: 3, awayScore: 0, date: '2026-06-15', time: '16:00', stadium: 'SoFi Stadium', stage: 'group', group: 'D', status: 'finished', events: [
    { minute: 12, type: 'goal', player: 'H. Kane', team: 'home', detail: 'B. Saka assist' },
    { minute: 44, type: 'goal', player: 'J. Bellingham', team: 'home', detail: 'Penalty' },
    { minute: 89, type: 'goal', player: 'M. Rashford', team: 'home', detail: 'Foden assist' },
  ]},
  { id: 'm8', homeTeam: 'cro', awayTeam: 'usa', homeScore: 1, awayScore: 1, date: '2026-06-15', time: '20:00', stadium: 'Levi\'s Stadium', stage: 'group', group: 'D', status: 'finished', events: [
    { minute: 37, type: 'goal', player: 'L. Modrić', team: 'home', detail: 'Kovačić assist' },
    { minute: 68, type: 'goal', player: 'C. Pulisic', team: 'away', detail: 'Penalty' },
  ]},
  { id: 'm9', homeTeam: 'esp', awayTeam: 'aus', homeScore: 3, awayScore: 1, date: '2026-06-16', time: '17:00', stadium: 'Allegiant Stadium', stage: 'group', group: 'E', status: 'finished', events: [
    { minute: 8, type: 'goal', player: 'L. Yamal', team: 'home', detail: 'Pedri assist' },
    { minute: 34, type: 'goal', player: 'A. Morata', team: 'home', detail: 'Nico Williams assist' },
    { minute: 51, type: 'goal', player: 'M. Boyle', team: 'away', detail: 'Goodwin assist' },
    { minute: 76, type: 'goal', player: 'D. Olmo', team: 'home', detail: 'Yamal assist' },
  ]},
  { id: 'm10', homeTeam: 'ger', awayTeam: 'kor', homeScore: 2, awayScore: 0, date: '2026-06-16', time: '20:00', stadium: 'Arrowhead Stadium', stage: 'group', group: 'E', status: 'finished', events: [
    { minute: 28, type: 'goal', player: 'K. Havertz', team: 'home', detail: 'Musiala assist' },
    { minute: 73, type: 'goal', player: 'J. Wirtz', team: 'home', detail: 'Gündoğan assist' },
  ]},
  { id: 'm11', homeTeam: 'bel', awayTeam: 'irn', homeScore: 1, awayScore: 0, date: '2026-06-17', time: '16:00', stadium: 'NRG Stadium', stage: 'group', group: 'F', status: 'finished', events: [
    { minute: 63, type: 'goal', player: 'R. Lukaku', team: 'home', detail: 'K. De Bruyne assist' },
  ]},
  { id: 'm12', homeTeam: 'uru', awayTeam: 'mex2', homeScore: 2, awayScore: 2, date: '2026-06-17', time: '20:00', stadium: 'Estadio BBVA', stage: 'group', group: 'F', status: 'finished', events: [
    { minute: 14, type: 'goal', player: 'F. Valverde', team: 'home', detail: 'Nuñez assist' },
    { minute: 38, type: 'goal', player: 'H. Saibari', team: 'away', detail: 'Ziyech assist' },
    { minute: 61, type: 'goal', player: 'D. Nuñez', team: 'home', detail: 'De Arrascaeta assist' },
    { minute: 81, type: 'goal', player: 'A. Ziyech', team: 'away', detail: 'Free kick' },
  ]},
  { id: 'm13', homeTeam: 'ita', awayTeam: 'ecu', homeScore: 2, awayScore: 0, date: '2026-06-18', time: '17:00', stadium: 'Estadio Guadalajara', stage: 'group', group: 'G', status: 'finished', events: [
    { minute: 33, type: 'goal', player: 'F. Chiesa', team: 'home', detail: 'Barella assist' },
    { minute: 77, type: 'goal', player: 'C. Immobile', team: 'home', detail: 'Pellegrini assist' },
  ]},
  { id: 'm14', homeTeam: 'den', awayTeam: 'nga', homeScore: 1, awayScore: 1, date: '2026-06-18', time: '20:00', stadium: 'Estadio Akron', stage: 'group', group: 'G', status: 'finished', events: [
    { minute: 26, type: 'goal', player: 'A. Lookman', team: 'away', detail: 'Osimhen assist' },
    { minute: 59, type: 'goal', player: 'C. Eriksen', team: 'home', detail: 'Højlund assist' },
  ]},
  { id: 'm15', homeTeam: 'sui', awayTeam: 'srb', homeScore: 2, awayScore: 1, date: '2026-06-19', time: '16:00', stadium: 'Estadio Azteca', stage: 'group', group: 'H', status: 'finished', events: [
    { minute: 18, type: 'goal', player: 'G. Xhaka', team: 'home', detail: 'Shaqiri assist' },
    { minute: 45, type: 'goal', player: 'A. Mitrović', team: 'away', detail: 'Tadić assist' },
    { minute: 82, type: 'goal', player: 'X. Shaqiri', team: 'home', detail: 'Vargas assist' },
  ]},
  { id: 'm16', homeTeam: 'col', awayTeam: 'bra', homeScore: 1, awayScore: 1, date: '2026-06-19', time: '20:00', stadium: 'Rose Bowl', stage: 'group', group: 'H', status: 'finished', events: [
    { minute: 22, type: 'goal', player: 'R. James', team: 'home', detail: 'Díaz assist' },
    { minute: 55, type: 'goal', player: 'L. Díaz', team: 'home', detail: 'Free kick' },
  ]},
  { id: 'm17', homeTeam: 'bra', awayTeam: 'ned', homeScore: 2, awayScore: 0, date: '2026-06-22', time: '17:00', stadium: 'MetLife Stadium', stage: 'group', group: 'A', status: 'finished', events: [
    { minute: 16, type: 'goal', player: 'Raphinha', team: 'home', detail: 'Neymar assist' },
    { minute: 68, type: 'goal', player: 'Vinícius Jr.', team: 'home', detail: 'Casemiro assist' },
  ]},
  { id: 'm18', homeTeam: 'qat', awayTeam: 'sen', homeScore: 1, awayScore: 3, date: '2026-06-22', time: '21:00', stadium: 'NRG Stadium', stage: 'group', group: 'A', status: 'finished', events: [
    { minute: 11, type: 'goal', player: 'A. Afif', team: 'home', detail: 'Al-Haydos assist' },
    { minute: 28, type: 'goal', player: 'S. Mané', team: 'away', detail: 'Penalty' },
    { minute: 56, type: 'goal', player: 'I. Sarr', team: 'away', detail: 'N. Mendy assist' },
    { minute: 79, type: 'goal', player: 'H. Diallo', team: 'away', detail: 'Mané assist' },
  ]},
  { id: 'm19', homeTeam: 'arg', awayTeam: 'mex', homeScore: 3, awayScore: 1, date: '2026-06-23', time: '16:00', stadium: 'AT&T Stadium', stage: 'group', group: 'B', status: 'live', events: [
    { minute: 8, type: 'goal', player: 'L. Messi', team: 'home', detail: 'Di María assist' },
    { minute: 35, type: 'goal', player: 'A. Mac Allister', team: 'home', detail: 'De Paul assist' },
    { minute: 41, type: 'goal', player: 'H. Herrera', team: 'away', detail: 'Lozano assist' },
    { minute: 67, type: 'goal', player: 'J. Álvarez', team: 'home', detail: 'Messi assist' },
  ]},
  { id: 'm20', homeTeam: 'ksa', awayTeam: 'por', homeScore: 1, awayScore: 2, date: '2026-06-23', time: '20:00', stadium: 'SoFi Stadium', stage: 'group', group: 'B', status: 'live', events: [
    { minute: 22, type: 'goal', player: 'Cristiano Ronaldo', team: 'away', detail: 'B. Silva assist' },
    { minute: 58, type: 'goal', player: 'S. Al-Dawsari', team: 'home', detail: 'Free kick' },
    { minute: 76, type: 'goal', player: 'B. Fernandes', team: 'away', detail: 'J. Félix assist' },
  ]},
  { id: 'm21', homeTeam: 'fra', awayTeam: 'jpn', homeScore: 1, awayScore: 1, date: '2026-06-24', time: '17:00', stadium: 'BC Place', stage: 'group', group: 'C', status: 'live', events: [
    { minute: 33, type: 'goal', player: 'K. Mbappé', team: 'home', detail: 'Dembélé assist' },
    { minute: 62, type: 'goal', player: 'T. Asano', team: 'away', detail: 'Kamada assist' },
  ]},
  { id: 'm22', homeTeam: 'can', awayTeam: 'tun', homeScore: 3, awayScore: 2, date: '2026-06-24', time: '20:00', stadium: 'Mercedes-Benz Stadium', stage: 'group', group: 'C', status: 'live', events: [
    { minute: 12, type: 'goal', player: 'A. Davies', team: 'home', detail: 'David assist' },
    { minute: 29, type: 'goal', player: 'J. David', team: 'home', detail: 'Davies assist' },
    { minute: 45, type: 'goal', player: 'W. Khazri', team: 'away', detail: 'Penalty' },
    { minute: 67, type: 'goal', player: 'T. Skhiri', team: 'away', detail: 'Mejbri assist' },
    { minute: 88, type: 'goal', player: 'C. Larin', team: 'home', detail: 'Buchanan assist' },
  ]},
  { id: 'm23', homeTeam: 'eng', awayTeam: 'cro', homeScore: 2, awayScore: 0, date: '2026-06-25', time: '16:00', stadium: 'Levi\'s Stadium', stage: 'group', group: 'D', status: 'upcoming', events: []},
  { id: 'm24', homeTeam: 'usa', awayTeam: 'cmr', homeScore: null, awayScore: null, date: '2026-06-25', time: '20:00', stadium: 'Allegiant Stadium', stage: 'group', group: 'D', status: 'upcoming', events: []},
  { id: 'm25', homeTeam: 'esp', awayTeam: 'ger', homeScore: null, awayScore: null, date: '2026-06-26', time: '17:00', stadium: 'Arrowhead Stadium', stage: 'group', group: 'E', status: 'upcoming', events: []},
  { id: 'm26', homeTeam: 'kor', awayTeam: 'aus', homeScore: null, awayScore: null, date: '2026-06-26', time: '20:00', stadium: 'Estadio BBVA', stage: 'group', group: 'E', status: 'upcoming', events: []},
  { id: 'm27', homeTeam: 'bel', awayTeam: 'uru', homeScore: null, awayScore: null, date: '2026-06-27', time: '16:00', stadium: 'Estadio Azteca', stage: 'group', group: 'F', status: 'upcoming', events: []},
  { id: 'm28', homeTeam: 'mex2', awayTeam: 'irn', homeScore: null, awayScore: null, date: '2026-06-27', time: '20:00', stadium: 'Rose Bowl', stage: 'group', group: 'F', status: 'upcoming', events: []},
  { id: 'm29', homeTeam: 'ita', awayTeam: 'den', homeScore: null, awayScore: null, date: '2026-06-28', time: '17:00', stadium: 'Estadio Guadalajara', stage: 'group', group: 'G', status: 'upcoming', events: []},
  { id: 'm30', homeTeam: 'nga', awayTeam: 'ecu', homeScore: null, awayScore: null, date: '2026-06-28', time: '20:00', stadium: 'Estadio Akron', stage: 'group', group: 'G', status: 'upcoming', events: []},
  { id: 'm31', homeTeam: 'sui', awayTeam: 'col', homeScore: null, awayScore: null, date: '2026-06-29', time: '16:00', stadium: 'MetLife Stadium', stage: 'group', group: 'H', status: 'upcoming', events: []},
  { id: 'm32', homeTeam: 'srb', awayTeam: 'jor', homeScore: null, awayScore: null, date: '2026-06-29', time: '20:00', stadium: 'AT&T Stadium', stage: 'group', group: 'H', status: 'upcoming', events: []},

  { id: 'r1', homeTeam: 'winnerA', awayTeam: 'runnerB', homeScore: null, awayScore: null, date: '2026-07-02', time: '17:00', stadium: 'Rose Bowl', stage: 'round16', status: 'upcoming', events: []},
  { id: 'qf1', homeTeam: 'winnerR1', awayTeam: 'winnerR2', homeScore: null, awayScore: null, date: '2026-07-06', time: '17:00', stadium: 'MetLife Stadium', stage: 'quarter', status: 'upcoming', events: []},
  { id: 'sf1', homeTeam: 'winnerQF1', awayTeam: 'winnerQF2', homeScore: null, awayScore: null, date: '2026-07-10', time: '17:00', stadium: 'AT&T Stadium', stage: 'semi', status: 'upcoming', events: []},
  { id: 'tp', homeTeam: 'loserSF1', awayTeam: 'loserSF2', homeScore: null, awayScore: null, date: '2026-07-13', time: '17:00', stadium: 'SoFi Stadium', stage: 'third', status: 'upcoming', events: []},
  { id: 'fn', homeTeam: 'winnerSF1', awayTeam: 'winnerSF2', homeScore: null, awayScore: null, date: '2026-07-19', time: '18:00', stadium: 'MetLife Stadium', stage: 'final', status: 'upcoming', events: []},
]

export function getMatch(id: string): Match | undefined {
  return matches.find(m => m.id === id)
}
