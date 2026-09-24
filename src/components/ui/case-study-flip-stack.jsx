import React, { useState } from 'react'

export function CaseStudyFlipStack({ items }) {
  const [active, setActive] = useState(0)

  return (
    <div className="flip-stack" style={{ '--stack-count': items.length }}>
      <div className="flip-stack-stage">
        {items.map((item, index) => {
          const offset = (index - active + items.length) % items.length
          const isActive = index === active
          return (
            <button
              className={`flip-card ${isActive ? 'is-active' : ''}`}
              key={item.title}
              type="button"
              onClick={() => setActive(index)}
              style={{
                '--card-bg': item.background,
                '--card-fg': item.foreground,
                transform: `translateY(${offset * 10}px) scale(${1 - offset * 0.018}) rotateX(${offset * 1}deg)`,
                opacity: 1 - offset * 0.055,
                zIndex: 30 - offset,
              }}
              aria-label={`Show ${item.title}`}
            >
              <div className="flip-card-copy">
                <span className="flip-eyebrow">{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="flip-card-image">
                <img src={item.image} alt={item.imageAlt} loading="lazy" />
              </div>
            </button>
          )
        })}
      </div>
      <div className="flip-controls" aria-label="Style selection">
        {items.map((item, index) => (
          <button
            type="button"
            key={item.title}
            className={index === active ? 'active' : ''}
            onClick={() => setActive(index)}
            aria-label={`Select ${item.eyebrow}`}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
