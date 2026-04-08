import React from 'react'

export function LightIcon({ on, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6"/>
      <path d="M10 22h4"/>
      <path d="M12 2v1"/>
      <path d="M4.22 7.22l.71.71"/>
      <path d="M2 13h1"/>
      <path d="M20 13h1"/>
      <path d="M19.07 7.93l.71-.71"/>
      <path d="M15.54 14.54A5 5 0 0 0 17 10a5 5 0 1 0-10 0c0 1.62.77 3.06 1.96 3.98"/>
      {on && <circle cx="12" cy="10" r="2" fill="currentColor" stroke="none" opacity="0.4"/>}
    </svg>
  )
}

export function ThermostatIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
      <circle cx="11.5" cy="17.5" r="1.5" fill="currentColor" stroke="currentColor"/>
      <line x1="11.5" y1="9" x2="11.5" y2="15.5" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

export function CurtainIcon({ position = 100, size = 22 }) {
  const openAmount = (100 - position) / 100
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      {/* Rail */}
      <line x1="2" y1="3" x2="22" y2="3"/>
      {/* Left curtain */}
      <path d={`M3 3v${18 * (1 - openAmount * 0.7)}`}/>
      <path d={`M6 3v${18 * (1 - openAmount * 0.5)}`}/>
      {/* Right curtain */}
      <path d={`M18 3v${18 * (1 - openAmount * 0.5)}`}/>
      <path d={`M21 3v${18 * (1 - openAmount * 0.7)}`}/>
      {/* Center lines when closed */}
      {position > 30 && <>
        <path d={`M9 3v${18 * (1 - openAmount * 0.3)}`}/>
        <path d={`M12 3v${18 * (1 - openAmount * 0.2)}`}/>
        <path d={`M15 3v${18 * (1 - openAmount * 0.3)}`}/>
      </>}
    </svg>
  )
}

export function CameraIcon({ active = true, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      {/* Camera body */}
      <path d="M2 8a2 2 0 0 1 2-2h2l2-3h4l2 3h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8z"/>
      {/* Lens */}
      <circle cx="10" cy="12" r="3"/>
      {/* Mount bracket */}
      <path d="M18 10l4-2v8l-4-2"/>
      {active && <circle cx="10" cy="12" r="1" fill="currentColor" stroke="none" opacity="0.4"/>}
    </svg>
  )
}
