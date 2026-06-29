'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function AutoRefresh({ interval = 30000 }: { interval?: number }) {
  const router = useRouter()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (document.visibilityState === 'visible') {
        router.refresh()
      }
    }, interval)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [router, interval])

  return null
}
