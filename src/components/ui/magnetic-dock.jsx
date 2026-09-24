import React, { useRef } from 'react'

export function MagneticDock({ items }) {
  const dockRef = useRef(null)

  const move = (event) => {
    const dock = dockRef.current
    if (!dock) return
    const rect = dock.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    dock.style.setProperty('--mx', `${x}px`)
    dock.style.setProperty('--my', `${y}px`)

    dock.querySelectorAll('.dock-item').forEach((itemEl) => {
      const itemRect = itemEl.getBoundingClientRect()
      const cx = itemRect.left + itemRect.width / 2
      const cy = itemRect.top + itemRect.height / 2
      const distance = Math.hypot(event.clientX - cx, event.clientY - cy)
      const strength = Math.max(0, 1 - distance / 150)
      itemEl.style.setProperty('--magnetic-scale', `${1 + strength * 0.22}`)
      itemEl.style.setProperty('--magnetic-y', `${-strength * 5}px`)
    })
  }

  const reset = () => {
    const dock = dockRef.current
    if (!dock) return
    dock.querySelectorAll('.dock-item').forEach((itemEl) => {
      itemEl.style.setProperty('--magnetic-scale', '1')
      itemEl.style.setProperty('--magnetic-y', '0px')
    })
  }

  return (
    <nav className="magnetic-dock" ref={dockRef} onPointerMove={move} onPointerLeave={reset} aria-label="Main navigation">
      <div className="dock-glow" />
      {items.map((item) => (
        <a
          key={item.id}
          className={`dock-item ${item.isActive ? 'active' : ''} ${item.highlight ? 'download-item' : ''}`}
          href={item.href || '#top'}
          download={item.download || undefined}
          aria-label={item.label}
        >
          <span className="dock-icon">{item.icon}</span>
          <span className="dock-label">{item.label}</span>
          {item.badge ? <span className="dock-badge">{item.badge}</span> : null}
        </a>
      ))}
    </nav>
  )
}

export const DockIconHome = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 10 8-6 8 6v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z" /></svg>
export const DockIconInstall = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5" /></svg>
export const DockIconGrid = () => <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>
export const DockIconDownload = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11m0 0 4-4m-4 4-4-4M4 19h16" /></svg>
export const DockIconInfo = () => <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 10v6m0-9v.01" /></svg>


export function MagneticDownload({ href, children = 'DOWNLOAD 1.0.3' }) {
  const ref = useRef(null)

  const move = (event) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width
    const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height
    el.style.setProperty('--mag-x', `${dx * 12}px`)
    el.style.setProperty('--mag-y', `${dy * 8}px`)
    el.style.setProperty('--mag-scale', '1.045')
  }

  const reset = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--mag-x', '0px')
    el.style.setProperty('--mag-y', '0px')
    el.style.setProperty('--mag-scale', '1')
  }

  return (
    <a
      ref={ref}
      className="magnetic-download"
      href={href}
      download
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <span className="magnetic-download-icon"><DockIconDownload /></span>
      <span>{children}</span>
      <span className="magnetic-download-arrow">↗</span>
    </a>
  )
}
