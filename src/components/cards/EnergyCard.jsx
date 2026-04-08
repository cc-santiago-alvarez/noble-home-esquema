import React from 'react'
import { useDevices } from '../../context/DeviceContext'
import Carousel from '../shared/Carousel'

function EnergyFlowPage() {
  const { devices } = useDevices()
  const e = devices.energy

  return (
    <div className="energy-flow-page">
      <div className="card-page-header">Energy distribution today</div>
      <div className="energy-flow-diagram">
        <svg viewBox="0 0 380 260" className="energy-flow-svg">
          {/* Connection lines */}
          {/* Solar to House */}
          <path d="M 120 50 C 180 50, 220 100, 280 100" fill="none" stroke="#eab308" strokeWidth="1.5" opacity="0.5"/>
          {/* Gas to House */}
          <path d="M 300 50 C 300 70, 290 85, 280 100" fill="none" stroke="#9ca3af" strokeWidth="1.5" opacity="0.5"/>
          {/* Grid to House */}
          <path d="M 80 140 C 140 140, 200 120, 280 110" fill="none" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.5"/>
          {/* House to Battery */}
          <path d="M 270 130 C 240 160, 200 190, 170 210" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.5"/>
          {/* House to Water */}
          <path d="M 300 130 C 310 170, 310 200, 300 220" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.5"/>

          {/* Solar node */}
          <circle cx="110" cy="42" r="26" fill="none" stroke="#eab308" strokeWidth="2"/>
          <text x="110" y="38" textAnchor="middle" fontSize="12" fill="#eab308">
            <tspan x="110" dy="0">&#9788;</tspan>
          </text>
          <text x="110" y="54" textAnchor="middle" fontSize="8" fontWeight="600" fill="#1a1a2e">{e.solar.value} {e.solar.unit}</text>
          <text x="110" y="80" textAnchor="middle" fontSize="9" fill="#6b7280">Solar</text>

          {/* Gas node */}
          <circle cx="300" cy="42" r="26" fill="none" stroke="#9ca3af" strokeWidth="2"/>
          <text x="300" y="38" textAnchor="middle" fontSize="14" fill="#6b7280">&#x1F525;</text>
          <text x="300" y="54" textAnchor="middle" fontSize="8" fontWeight="600" fill="#1a1a2e">{e.gas.value} {e.gas.unit}</text>
          <text x="300" y="80" textAnchor="middle" fontSize="9" fill="#6b7280">Gas</text>

          {/* Grid (Red) node */}
          <g>
            <circle cx="55" cy="140" r="26" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
            <text x="55" y="136" textAnchor="middle" fontSize="12" fill="#8b5cf6">
              <tspan x="55" dy="0">&#8644;</tspan>
            </text>
            <text x="55" y="150" textAnchor="middle" fontSize="7" fill="#6b7280">
              <tspan x="55" dy="0">← {e.gridIn.value} kWh</tspan>
            </text>
            <text x="55" y="159" textAnchor="middle" fontSize="7" fill="#6b7280">
              <tspan x="55" dy="0">→ {e.gridOut.value} kWh</tspan>
            </text>
            <text x="55" y="178" textAnchor="middle" fontSize="9" fill="#6b7280">Red</text>
          </g>

          {/* House node */}
          <circle cx="285" cy="110" r="30" fill="none" stroke="#f97316" strokeWidth="2"/>
          <text x="285" y="106" textAnchor="middle" fontSize="14" fill="#f97316">&#x1F3E0;</text>
          <text x="285" y="122" textAnchor="middle" fontSize="8" fontWeight="600" fill="#1a1a2e">{e.house.value} {e.house.unit}</text>

          {/* Battery node */}
          <circle cx="155" cy="220" r="26" fill="none" stroke="#22c55e" strokeWidth="2"/>
          <text x="155" y="216" textAnchor="middle" fontSize="12" fill="#22c55e">&#x1F50B;</text>
          <text x="155" y="230" textAnchor="middle" fontSize="7" fill="#6b7280">
            <tspan x="155" dy="0">← {e.batteryIn.value} kWh</tspan>
          </text>
          <text x="155" y="239" textAnchor="middle" fontSize="7" fill="#6b7280">
            <tspan x="155" dy="0">→ {e.batteryOut.value} kWh</tspan>
          </text>
          <text x="155" y="256" textAnchor="middle" fontSize="9" fill="#6b7280">Batería</text>

          {/* Water node */}
          <circle cx="305" cy="230" r="26" fill="none" stroke="#06b6d4" strokeWidth="2"/>
          <text x="305" y="226" textAnchor="middle" fontSize="14" fill="#06b6d4">&#x1F4A7;</text>
          <text x="305" y="242" textAnchor="middle" fontSize="8" fontWeight="600" fill="#1a1a2e">{e.water.value} {e.water.unit}</text>
          <text x="305" y="256" textAnchor="middle" fontSize="9" fill="#6b7280">Agua</text>
        </svg>
      </div>
    </div>
  )
}

function EnergyChartPage() {
  const { devices } = useDevices()
  const data = devices.energyHistory

  const width = 360
  const height = 220
  const padLeft = 50
  const padRight = 20
  const padTop = 30
  const padBottom = 40

  const chartW = width - padLeft - padRight
  const chartH = height - padTop - padBottom

  const values = data.map(d => d.value)
  const minVal = Math.floor(Math.min(...values) / 5) * 5 - 5
  const maxVal = Math.ceil(Math.max(...values) / 5) * 5 + 5

  const points = data.map((d, i) => {
    const x = padLeft + (i / (data.length - 1)) * chartW
    const y = padTop + (1 - (d.value - minVal) / (maxVal - minVal)) * chartH
    return { x, y, ...d }
  })

  const polyline = points.map(p => `${p.x},${p.y}`).join(' ')

  const yTicks = 5
  const yStep = (maxVal - minVal) / yTicks

  return (
    <div className="energy-chart-page">
      <div className="card-page-header">Consumo de Energía Últimos 6 Meses</div>
      <div className="energy-chart-container">
        <svg viewBox={`0 0 ${width} ${height}`} className="energy-chart-svg">
          {/* Y axis grid lines and labels */}
          {Array.from({ length: yTicks + 1 }, (_, i) => {
            const val = minVal + i * yStep
            const y = padTop + (1 - (val - minVal) / (maxVal - minVal)) * chartH
            return (
              <g key={i}>
                <line x1={padLeft} y1={y} x2={width - padRight} y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
                <text x={padLeft - 8} y={y + 3} textAnchor="end" fontSize="8" fill="#6b7280">{Math.round(val)}</text>
              </g>
            )
          })}

          {/* Y axis label */}
          <text x="12" y={padTop + chartH / 2} textAnchor="middle" fontSize="7" fill="#6b7280" transform={`rotate(-90, 12, ${padTop + chartH / 2})`}>
            Consumo (kWh)
          </text>

          {/* Line */}
          <polyline points={polyline} fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" />

          {/* Data points */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
          ))}

          {/* X axis labels */}
          {points.map((p, i) => (
            <text key={i} x={p.x} y={height - padBottom + 16} textAnchor="middle" fontSize="8" fill="#6b7280">
              {p.month}
            </text>
          ))}

          {/* X axis label */}
          <text x={padLeft + chartW / 2} y={height - 4} textAnchor="middle" fontSize="8" fill="#6b7280">Mes</text>
        </svg>
      </div>
    </div>
  )
}

export default function EnergyCard() {
  return (
    <Carousel>
      <EnergyFlowPage />
      <EnergyChartPage />
    </Carousel>
  )
}
