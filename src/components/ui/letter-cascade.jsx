import React from 'react'

export function LetterCascade({ text, className = '' }) {
  return (
    <span className={`letter-cascade ${className}`} aria-label={text}>
      {text.split('').map((letter, index) => (
        <span className="letter-cascade-char" key={`${letter}-${index}`} style={{ '--i': index }}>
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </span>
  )
}
