import React, { useEffect, useState } from 'react'

const COUNT_KEY = 'humble-carousel-visits'
const SESSION_KEY = 'humble-carousel-visit-counted'

export function FlightStatusCardAdaptive() {
  const [visitors, setVisitors] = useState(null)

  useEffect(() => {
    try {
      const stored = Number.parseInt(localStorage.getItem(COUNT_KEY) || '0', 10)
      const countedThisSession = sessionStorage.getItem(SESSION_KEY) === '1'
      const next = countedThisSession ? Math.max(stored, 1) : stored + 1

      if (!countedThisSession) {
        localStorage.setItem(COUNT_KEY, String(next))
        sessionStorage.setItem(SESSION_KEY, '1')
      }

      setVisitors(next)
    } catch {
      setVisitors(1)
    }
  }, [])

  return (
    <aside className="visitor-card" aria-label="Website visitor count">
      <span className="visitor-live"><i /> LIVE</span>
      <span className="visitor-label">VISITOR</span>
      <b>{String(visitors ?? 0).padStart(5, '0')}</b>
    </aside>
  )
}
