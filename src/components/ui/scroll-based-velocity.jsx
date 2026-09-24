import React, { useEffect, useRef } from 'react'

export function ScrollBasedVelocity({ image, alt = '', strength = 0.42, className = '' }) {
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const velocityRef = useRef(0)
  const cycleRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      const cycle = track.scrollWidth / 4
      if (!cycle) return
      cycleRef.current = cycle
      if (!offsetRef.current) offsetRef.current = -cycle / 2
    }

    const onScroll = () => {
      const previous = onScroll.lastY ?? window.scrollY
      const delta = window.scrollY - previous
      onScroll.lastY = window.scrollY
      velocityRef.current -= delta * strength
    }

    const animate = () => {
      offsetRef.current += velocityRef.current
      velocityRef.current *= 0.88

      const cycle = cycleRef.current
      if (cycle > 0) {
        while (offsetRef.current <= -cycle) offsetRef.current += cycle
        while (offsetRef.current >= 0) offsetRef.current -= cycle
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    onScroll.lastY = window.scrollY
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', onScroll, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [strength])

  return (
    <section className={`velocity-strip ${className}`} aria-label="HUMBLE brand marquee">
      <div ref={trackRef} className="velocity-track">
        {[0, 1, 2, 3].map((copy) => (
          <React.Fragment key={copy}>
            <img src={image} alt={alt} draggable="false" />
            <span aria-hidden="true">✦</span>
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}
