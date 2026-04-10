import React from 'react'

export default function ThermostatDial({ roomName, currentTemp, targetTemp, mode, onIncrease, onDecrease }) {
  const radius = 40
  const cx = 55
  const cy = 55
  const circumference = 2 * Math.PI * radius
  const sweepFraction = 270 / 360
  const arcLength = circumference * sweepFraction
  const gapLength = circumference - arcLength

  // The arc starts at 135deg (bottom-left) and sweeps 270deg clockwise
  // stroke-dashoffset rotates the start; we rotate the SVG group instead
  const tempFraction = (targetTemp - 16) / (30 - 16)
  const fillLength = arcLength * tempFraction

  // Colors: orange for left half (heating), blue for right half (cooling)
  const orangeArc = Math.min(fillLength, arcLength * 0.5)
  const blueArc = Math.max(0, fillLength - arcLength * 0.5)

  return (
    <div className="thermostat-dial">
      <span className="dial-room-name">{roomName}</span>
      <svg viewBox="0 0 110 110" className="dial-svg">
        <g transform={`rotate(135, ${cx}, ${cy})`}>
          {/* Background arc */}
          <circle
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke="var(--chart-grid)"
            strokeWidth="5"
            strokeDasharray={`${arcLength} ${gapLength}`}
            strokeLinecap="round"
          />
          {/* Orange (heating) arc */}
          <circle
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke="#f97316"
            strokeWidth="5"
            strokeDasharray={`${orangeArc} ${circumference - orangeArc}`}
            strokeLinecap="round"
          />
          {/* Blue (cooling) arc */}
          {blueArc > 0 && (
            <circle
              cx={cx} cy={cy} r={radius}
              fill="none"
              stroke="#60a5fa"
              strokeWidth="5"
              strokeDasharray={`${blueArc} ${circumference - blueArc}`}
              strokeDashoffset={-arcLength * 0.5}
              strokeLinecap="round"
            />
          )}
        </g>
        {/* Current temp (left) */}
        <text x={cx - 12} y={cy - 2} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
          {currentTemp}°
        </text>
        {/* Target temp (right) */}
        <text x={cx + 14} y={cy - 2} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
          {targetTemp}°
        </text>
        {/* Mode label */}
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
          {mode === 'inactive' ? 'Inactive' : mode}
        </text>
        {/* Target indicator */}
        <text x={cx} y={cy + 26} textAnchor="middle" fontSize="7" fill="var(--text-secondary)">
          ± {Math.round((currentTemp + targetTemp) / 2)} °C
        </text>
      </svg>
      <div className="dial-buttons">
        <button className="dial-btn" onClick={onDecrease}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button className="dial-btn" onClick={onIncrease}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
