'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Trophy, Calendar, Table, Goal, Newspaper, Users } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Beranda', icon: Trophy },
  { href: '/matches', label: 'Jadwal', icon: Calendar },
  { href: '/standings', label: 'Klasemen', icon: Table },
  { href: '/top-scorers', label: 'Top Skor', icon: Goal },
  { href: '/teams', label: 'Tim', icon: Users },
  { href: '/news', label: 'Berita', icon: Newspaper },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span>WorldCup<span className="text-yellow-400">2026</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-yellow-400/10 text-yellow-400' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>

          <button className="md:hidden text-zinc-400" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-yellow-400/10 text-yellow-400' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
