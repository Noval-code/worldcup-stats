import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: "WorldCup 2026 - Statistik Bola",
  description: "Portal statistik Piala Dunia 2026 - jadwal, klasemen, top skor, dan berita terbaru",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full bg-zinc-950 text-zinc-100 flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-800 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-xs text-zinc-700">
            WorldCup 2026 Stats Portal — Data untuk tujuan informasi
          </div>
        </footer>
      </body>
    </html>
  )
}
