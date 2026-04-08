import React, { useState } from 'react'
import { useDevices } from '../context/DeviceContext'
import '../styles/EnergyView.css'

/* ═══════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════ */

const X_LABELS = [
  { hour: 0, label: '7 abr' }, { hour: 4, label: '4:00' }, { hour: 8, label: '8:00' },
  { hour: 12, label: '12:00' }, { hour: 16, label: '16:00' }, { hour: 20, label: '20:00' },
]

function EnergyDistribution({ compact }) {
  const { devices } = useDevices()
  const e = devices.energy
  const vb = compact ? '0 0 380 280' : '0 0 380 260'

  return (
    <div className="ev-card">
      <div className="ev-card-title">Distribución de la energía</div>
      <div className="ev-card-body ev-flow-body">
        <svg viewBox={vb} className="ev-flow-svg">
          <path d="M 120 50 C 180 50, 220 100, 275 105" fill="none" stroke="#eab308" strokeWidth="1.5" opacity="0.4"/>
          <path d="M 300 55 C 300 70, 290 88, 280 100" fill="none" stroke="#9ca3af" strokeWidth="1.5" opacity="0.4"/>
          <path d="M 80 145 C 150 145, 210 120, 270 115" fill="none" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.4"/>
          <path d="M 270 130 C 240 165, 200 195, 170 215" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.4"/>
          <path d="M 305 130 C 315 170, 315 200, 310 220" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.4"/>
          <circle cx="110" cy="42" r="26" fill="none" stroke="#eab308" strokeWidth="2"/>
          <text x="110" y="38" textAnchor="middle" fontSize="14" fill="#eab308">⚡</text>
          <text x="110" y="54" textAnchor="middle" fontSize="8" fontWeight="600" fill="#1a1a2e">{e.solar.value} {e.solar.unit}</text>
          <text x="110" y="80" textAnchor="middle" fontSize="9" fill="#6b7280">Solar</text>
          <circle cx="300" cy="42" r="26" fill="none" stroke="#f97316" strokeWidth="2"/>
          <text x="300" y="38" textAnchor="middle" fontSize="14" fill="#f97316">🔥</text>
          <text x="300" y="54" textAnchor="middle" fontSize="8" fontWeight="600" fill="#1a1a2e">{e.gas.value} {e.gas.unit}</text>
          <text x="300" y="80" textAnchor="middle" fontSize="9" fill="#6b7280">Gas</text>
          <circle cx="55" cy="145" r="26" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
          <text x="55" y="138" textAnchor="middle" fontSize="11" fill="#8b5cf6">⇌</text>
          <text x="55" y="150" textAnchor="middle" fontSize="7" fill="#6b7280">← {e.gridIn.value} kWh</text>
          <text x="55" y="159" textAnchor="middle" fontSize="7" fill="#6b7280">→ {e.gridOut.value} kWh</text>
          <text x="55" y="180" textAnchor="middle" fontSize="9" fill="#6b7280">Red</text>
          <circle cx="285" cy="112" r="30" fill="none" stroke="#f97316" strokeWidth="2"/>
          <text x="285" y="108" textAnchor="middle" fontSize="16" fill="#f97316">🏠</text>
          <text x="285" y="124" textAnchor="middle" fontSize="8" fontWeight="600" fill="#1a1a2e">{e.house.value} {e.house.unit}</text>
          <circle cx="155" cy="225" r="26" fill="none" stroke="#22c55e" strokeWidth="2"/>
          <text x="155" y="218" textAnchor="middle" fontSize="13" fill="#22c55e">🔋</text>
          <text x="155" y="232" textAnchor="middle" fontSize="7" fill="#6b7280">← {e.batteryIn.value} kWh</text>
          <text x="155" y="241" textAnchor="middle" fontSize="7" fill="#6b7280">→ {e.batteryOut.value} kWh</text>
          <text x="155" y="258" textAnchor="middle" fontSize="9" fill="#6b7280">Batería</text>
          <circle cx="310" cy="235" r="26" fill="none" stroke="#06b6d4" strokeWidth="2"/>
          <text x="310" y="230" textAnchor="middle" fontSize="14" fill="#06b6d4">💧</text>
          <text x="310" y="246" textAnchor="middle" fontSize="8" fontWeight="600" fill="#1a1a2e">{e.water.value} {e.water.unit}</text>
          <text x="310" y="258" textAnchor="middle" fontSize="9" fill="#6b7280">Agua</text>
        </svg>
      </div>
    </div>
  )
}

function SourcesTableCard({ rows }) {
  return (
    <div className="ev-card">
      <div className="ev-card-title">Fuentes</div>
      <div className="ev-card-body">
        <table className="ev-sources-table">
          <thead><tr><th>Fuente</th><th>Consumo</th><th>Coste</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={r.bold ? 'ev-row-bold' : ''}>
                <td>
                  {r.color && <span className="ev-source-dot" style={{ background: r.color }} />}
                  {r.label}
                </td>
                <td>{r.value}</td>
                <td>{r.cost || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ElectricityChart() {
  const { devices } = useDevices()
  const data = devices.energyHourly.electricity
  const w = 440, h = 240, pl = 35, pr = 10, pt = 15, pb = 30
  const cw = w - pl - pr, ch = h - pt - pb
  const minY = -1, maxY = 1.5, rangeY = maxY - minY
  const toX = (hour) => pl + (hour / 23) * cw
  const toY = (val) => pt + (1 - (val - minY) / rangeY) * ch
  const barW = cw / 24 * 0.7
  const totalKwh = data.reduce((s, d) => s + d.grid + d.solar, 0)
  const yTicks = [-1, -0.5, 0, 0.5, 1, 1.5]

  return (
    <div className="ev-card">
      <div className="ev-card-title">Consumo de electricidad<span className="ev-badge">+{Math.round(totalKwh)} kWh</span></div>
      <div className="ev-card-body ev-chart-body">
        <svg viewBox={`0 0 ${w} ${h}`} className="ev-chart-svg">
          {yTicks.map(v => (<g key={v}><line x1={pl} y1={toY(v)} x2={w - pr} y2={toY(v)} stroke="#e5e7eb" strokeWidth="0.5" /><text x={pl - 6} y={toY(v) + 3} textAnchor="end" fontSize="9" fill="#6b7280">{v}</text></g>))}
          <text x="8" y={pt + ch / 2} textAnchor="middle" fontSize="8" fill="#6b7280" transform={`rotate(-90,8,${pt + ch / 2})`}>kWh</text>
          <line x1={pl} y1={toY(0)} x2={w - pr} y2={toY(0)} stroke="#9ca3af" strokeWidth="0.8" />
          {data.map((d, i) => {
            const x = toX(d.hour) - barW / 2; const bw = barW / 3
            return (<g key={i}>
              {d.grid > 0 && <rect x={x} y={toY(d.grid)} width={bw} height={toY(0) - toY(d.grid)} fill="#93c5fd" rx="1" />}
              {d.solar > 0 && <rect x={x + bw} y={toY(d.solar)} width={bw} height={toY(0) - toY(d.solar)} fill="#fbbf24" rx="1" />}
              {d.export < 0 && <rect x={x + bw * 2} y={toY(0)} width={bw} height={toY(d.export) - toY(0)} fill="#a78bfa" rx="1" />}
            </g>)
          })}
          {X_LABELS.map(l => <text key={l.hour} x={toX(l.hour)} y={h - pb + 16} textAnchor="middle" fontSize="9" fill="#6b7280">{l.label}</text>)}
        </svg>
      </div>
    </div>
  )
}

function SourcesChart() {
  const { devices } = useDevices()
  const data = devices.energyHourly.sources
  const w = 400, h = 220, pl = 35, pr = 10, pt = 10, pb = 30
  const cw = w - pl - pr, ch = h - pt - pb, maxY = 30
  const toX = (hour) => pl + (hour / 23) * cw
  const toY = (val) => pt + (1 - val / maxY) * ch
  const solarPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(d.hour)},${toY(d.solar)}`).join(' ')
  const solarArea = `${solarPath} L${toX(23)},${toY(0)} L${toX(0)},${toY(0)} Z`
  const gridPoints = data.map(d => ({ x: toX(d.hour), y: toY(d.solar + d.grid) }))
  const gridPath = gridPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const gridArea = `${gridPath} L${toX(23)},${toY(0)} L${toX(0)},${toY(0)} Z`
  const yTicks = [0, 10, 20, 30]

  return (
    <div className="ev-card">
      <div className="ev-card-title">Fuentes de energía</div>
      <div className="ev-card-body ev-chart-body">
        <svg viewBox={`0 0 ${w} ${h}`} className="ev-chart-svg">
          {yTicks.map(v => (<g key={v}><line x1={pl} y1={toY(v)} x2={w - pr} y2={toY(v)} stroke="#e5e7eb" strokeWidth="0.5" /><text x={pl - 6} y={toY(v) + 3} textAnchor="end" fontSize="9" fill="#6b7280">{v}</text></g>))}
          <text x="8" y={pt + ch / 2} textAnchor="middle" fontSize="8" fill="#6b7280" transform={`rotate(-90,8,${pt + ch / 2})`}>kW</text>
          <path d={gridArea} fill="rgba(96,165,250,0.25)" />
          <path d={gridPath} fill="none" stroke="#60a5fa" strokeWidth="1.5" />
          <path d={solarArea} fill="rgba(251,191,36,0.3)" />
          <path d={solarPath} fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          {X_LABELS.map(l => <text key={l.hour} x={toX(l.hour)} y={h - pb + 16} textAnchor="middle" fontSize="9" fill="#6b7280">{l.label}</text>)}
        </svg>
      </div>
    </div>
  )
}

function EmptyBarChart({ title, unit }) {
  const w = 400, h = 220, pl = 30, pr = 10, pt = 10, pb = 30
  const cw = w - pl - pr, ch = h - pt - pb
  return (
    <div className="ev-card">
      <div className="ev-card-title">{title}</div>
      <div className="ev-card-body ev-chart-body">
        <svg viewBox={`0 0 ${w} ${h}`} className="ev-chart-svg">
          <text x="8" y={pt + ch / 2} textAnchor="middle" fontSize="8" fill="#6b7280" transform={`rotate(-90,8,${pt + ch / 2})`}>{unit}</text>
          {X_LABELS.map(l => { const x = pl + (l.hour / 23) * cw; return (<g key={l.hour}><line x1={x} y1={pt} x2={x} y2={pt + ch} stroke="#e5e7eb" strokeWidth="0.5" /><text x={x} y={h - pb + 16} textAnchor="middle" fontSize="9" fill="#6b7280">{l.label}</text></g>) })}
          <line x1={pl} y1={pt + ch} x2={w - pr} y2={pt + ch} stroke="#e5e7eb" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  )
}

function GaugeCard({ value, label, unit, color, max }) {
  const r = 50, cx = 60, cy = 60
  const circumference = 2 * Math.PI * r
  const sweep = 0.65
  const arcLen = circumference * sweep
  const gap = circumference - arcLen
  const fraction = typeof max === 'number' ? Math.min(value / max, 1) : value / 100
  const fill = arcLen * fraction

  return (
    <div className="ev-gauge-card">
      <div className="ev-gauge-info-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
      </div>
      <svg viewBox="0 0 120 90" className="ev-gauge-svg">
        <g transform={`rotate(126, ${cx}, ${cy})`}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" strokeDasharray={`${arcLen} ${gap}`} strokeLinecap="round" />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="8" strokeDasharray={`${fill} ${circumference - fill}`} strokeLinecap="round" />
        </g>
        <text x={cx} y={cy + 5} textAnchor="middle" fontSize="22" fontWeight="700" fill="#1a1a2e">{value}{unit === '%' ? '%' : ''}</text>
        {unit !== '%' && <text x={cx} y={cy + 18} textAnchor="middle" fontSize="10" fill="#6b7280">{unit}</text>}
      </svg>
      <div className="ev-gauge-label">{label}</div>
    </div>
  )
}

/* ─── Solar production chart ─── */
function SolarProductionChart() {
  const { devices } = useDevices()
  const data = devices.energyHourly.electricity
  const w = 440, h = 240, pl = 35, pr = 10, pt = 15, pb = 30
  const cw = w - pl - pr, ch = h - pt - pb
  const maxY = 1.8
  const toX = (hour) => pl + (hour / 23) * cw
  const toY = (val) => pt + (1 - val / maxY) * ch
  const barW = cw / 24 * 0.6
  const yTicks = [0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8]

  // Dashed envelope line
  const linePoints = data.filter(d => d.solar > 0).map(d => `${toX(d.hour)},${toY(d.solar * 1.2)}`)
  const allLinePoints = data.map(d => `${toX(d.hour)},${toY(d.solar > 0 ? d.solar * 1.2 : 0)}`)

  return (
    <div className="ev-card">
      <div className="ev-card-title">Producción solar<span className="ev-badge">7,75 kWh</span></div>
      <div className="ev-card-body ev-chart-body">
        <svg viewBox={`0 0 ${w} ${h}`} className="ev-chart-svg">
          {yTicks.map(v => (<g key={v}><line x1={pl} y1={toY(v)} x2={w - pr} y2={toY(v)} stroke="#e5e7eb" strokeWidth="0.5" /><text x={pl - 6} y={toY(v) + 3} textAnchor="end" fontSize="9" fill="#6b7280">{v}</text></g>))}
          <text x="8" y={pt + ch / 2} textAnchor="middle" fontSize="8" fill="#6b7280" transform={`rotate(-90,8,${pt + ch / 2})`}>kWh</text>
          {/* Dashed envelope */}
          <polyline points={allLinePoints.join(' ')} fill="none" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 3" />
          {/* Bars */}
          {data.map((d, i) => d.solar > 0 ? (
            <rect key={i} x={toX(d.hour) - barW / 2} y={toY(d.solar)} width={barW} height={toY(0) - toY(d.solar)} fill="#fbbf24" rx="1" />
          ) : null)}
          <line x1={pl} y1={toY(0)} x2={w - pr} y2={toY(0)} stroke="#9ca3af" strokeWidth="0.5" />
          {X_LABELS.map(l => <text key={l.hour} x={toX(l.hour)} y={h - pb + 16} textAnchor="middle" fontSize="9" fill="#6b7280">{l.label}</text>)}
        </svg>
      </div>
    </div>
  )
}

/* ─── Device usage chart ─── */
function DeviceUsageChart() {
  const w = 440, h = 260, pl = 35, pr = 10, pt = 15, pb = 50
  const cw = w - pl - pr, ch = h - pt - pb
  const maxY = 1.5
  const toX = (hour) => pl + (hour / 23) * cw
  const toY = (val) => pt + (1 - val / maxY) * ch
  const barW = cw / 24 * 0.7

  const devices = [
    { name: 'Electric car', color: '#93c5fd' },
    { name: 'Air conditioning', color: '#fbbf24' },
    { name: 'Washing machine', color: '#f9a8d4' },
    { name: 'Dryer', color: '#6ee7b7' },
    { name: 'Heat pump', color: '#c4b5fd' },
    { name: 'Boiler', color: '#fca5a5' },
    { name: 'Consumo sin seguimiento', color: '#d1d5db' },
  ]

  // Generate simple stacked data
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const stacks = hours.map(h => {
    const total = h < 6 ? 0.3 : h < 8 ? 0.5 : h < 10 ? 0.9 : h < 14 ? 1.3 : h < 17 ? 1.1 : h < 20 ? 0.8 : 0.5
    return { hour: h, values: [total * 0.15, total * 0.1, total * 0.08, total * 0.05, total * 0.12, total * 0.1, total * 0.4] }
  })

  return (
    <div className="ev-card">
      <div className="ev-card-title">Uso detallado de dispositivos individuales</div>
      <div className="ev-card-body ev-chart-body">
        <svg viewBox={`0 0 ${w} ${h}`} className="ev-chart-svg">
          {[0, 0.3, 0.6, 0.9, 1.2, 1.5].map(v => (<g key={v}><line x1={pl} y1={toY(v)} x2={w - pr} y2={toY(v)} stroke="#e5e7eb" strokeWidth="0.5" /><text x={pl - 6} y={toY(v) + 3} textAnchor="end" fontSize="8" fill="#6b7280">{v}</text></g>))}
          {stacks.map((s, si) => {
            let cumY = 0
            return (<g key={si}>{s.values.map((v, vi) => {
              const y0 = cumY; cumY += v
              return v > 0.01 ? <rect key={vi} x={toX(s.hour) - barW / 2} y={toY(y0 + v)} width={barW} height={toY(y0) - toY(y0 + v)} fill={devices[vi].color} rx="0.5" /> : null
            })}</g>)
          })}
          {X_LABELS.map(l => <text key={l.hour} x={toX(l.hour)} y={h - pb + 14} textAnchor="middle" fontSize="9" fill="#6b7280">{l.label}</text>)}
          {/* Legend */}
          {devices.map((d, i) => (
            <g key={i} transform={`translate(${pl + i * 56}, ${h - 14})`}>
              <circle cx="4" cy="0" r="3" fill={d.color} />
              <text x="10" y="3" fontSize="6" fill="#6b7280">{d.name}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}

/* ─── Device total horizontal bars ─── */
function DeviceTotalChart() {
  const devices = [
    { name: 'Electric car', value: 0.02, color: '#93c5fd' },
    { name: 'Air conditioning', value: 0.01, color: '#fbbf24' },
    { name: 'Washing machine', value: 0.01, color: '#f9a8d4' },
    { name: 'Dryer', value: 0.005, color: '#6ee7b7' },
    { name: 'Heat pump', value: 0.01, color: '#c4b5fd' },
    { name: 'Boiler', value: 0.005, color: '#fca5a5' },
  ]
  const w = 440, h = 180, pl = 110, pr = 30, pt = 10, pb = 25
  const cw = w - pl - pr, ch = h - pt - pb
  const barH = ch / devices.length * 0.6
  const gap = ch / devices.length

  return (
    <div className="ev-card">
      <div className="ev-card-title">Uso total de dispositivos individuales</div>
      <div className="ev-card-body ev-chart-body">
        <svg viewBox={`0 0 ${w} ${h}`} className="ev-chart-svg">
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map(v => {
            const x = pl + (v / 1) * cw
            return (<g key={v}><line x1={x} y1={pt} x2={x} y2={pt + ch} stroke="#e5e7eb" strokeWidth="0.5" /><text x={x} y={h - pb + 14} textAnchor="middle" fontSize="8" fill="#6b7280">{v}</text></g>)
          })}
          <text x={w - 10} y={h - pb + 14} textAnchor="end" fontSize="8" fill="#6b7280">kWh</text>
          {devices.map((d, i) => {
            const y = pt + i * gap + (gap - barH) / 2
            const bw = (d.value / 1) * cw
            return (<g key={i}>
              <text x={pl - 6} y={y + barH / 2 + 3} textAnchor="end" fontSize="9" fill="#6b7280">{d.name}</text>
              <rect x={pl} y={y} width={Math.max(bw, 2)} height={barH} fill={d.color} rx="2" />
            </g>)
          })}
        </svg>
      </div>
    </div>
  )
}

/* ─── Energy flow Sankey ─── */
function EnergyFlowSankey() {
  return (
    <div className="ev-card">
      <div className="ev-card-title">Flujo de energía</div>
      <div className="ev-card-body ev-chart-body">
        <svg viewBox="0 0 500 160" className="ev-chart-svg">
          {/* Sources */}
          <rect x="10" y="10" width="20" height="60" fill="#8b5cf6" rx="3" />
          <text x="5" y="85" fontSize="9" fill="#6b7280">Red</text>
          <rect x="10" y="90" width="20" height="50" fill="#f59e0b" rx="3" />
          <text x="5" y="150" fontSize="9" fill="#6b7280">Solar</text>

          {/* Flows */}
          <path d="M 30 20 C 120 20, 150 30, 200 35" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="40" />
          <path d="M 30 50 C 100 55, 140 60, 200 55" fill="none" stroke="rgba(249,115,22,0.1)" strokeWidth="25" />
          <path d="M 30 110 C 100 105, 140 80, 200 70" fill="none" stroke="rgba(245,158,11,0.15)" strokeWidth="30" />

          {/* Center divider */}
          <rect x="200" y="10" width="6" height="130" fill="#06b6d4" rx="3" opacity="0.4" />

          {/* Sinks */}
          <path d="M 206 30 C 260 35, 300 40, 350 45" fill="none" stroke="rgba(139,92,246,0.1)" strokeWidth="30" />
          <path d="M 206 70 C 260 68, 300 65, 350 60" fill="none" stroke="rgba(96,165,250,0.15)" strokeWidth="50" />

          <text x="210" y="28" fontSize="9" fill="#6b7280">Red</text>
          <text x="210" y="85" fontSize="9" fill="#6b7280">Home</text>
          <text x="370" y="55" fontSize="9" fill="#6b7280">Consumo sin seguimiento</text>
        </svg>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   TAB CONTENTS
   ═══════════════════════════════════════════ */

function ResumenTab() {
  const { devices } = useDevices()
  const e = devices.energy
  const summaryRows = [
    { color: '#eab308', label: 'Total solar', value: `${e.solar.value} kWh` },
    { color: '#22c55e', label: 'Total de la batería', value: '0 kWh' },
    { color: '#8b5cf6', label: 'Total de la red', value: `${(e.gridIn.value + e.gridOut.value).toFixed(2)} kWh`, cost: '0,00 US$' },
    { color: '#ef4444', label: 'Total de gas', value: `${e.gas.value} ${e.gas.unit}` },
    { color: '#06b6d4', label: 'Agua total', value: `${e.water.value} ${e.water.unit}` },
  ]
  return (
    <div className="energy-grid">
      <EnergyDistribution />
      <SourcesTableCard rows={summaryRows} />
      <SourcesChart />
      <ElectricityChart />
      <EmptyBarChart title="Consumo de gas" unit="m³" />
      <EmptyBarChart title="Consumo de agua" unit="L" />
    </div>
  )
}

function ElectricidadTab() {
  const { devices } = useDevices()
  const e = devices.energy
  const detailRows = [
    { color: '#eab308', label: 'Solar', value: `${e.solar.value} kWh` },
    { label: 'Total solar', value: `${e.solar.value} kWh`, bold: true },
    { label: 'Total de la batería', value: '0 kWh', bold: true },
    { color: '#93c5fd', label: 'sensor.energy_consumption_tarif_1', value: '3,59 kWh', cost: '0,00 US$' },
    { color: '#c4b5fd', label: 'Returned to grid low tariff', value: '-0 kWh', cost: '-0,00 US$' },
    { color: '#3b82f6', label: 'Grid consumption high tariff', value: '1,18 kWh', cost: '0,00 US$' },
    { color: '#8b5cf6', label: 'Returned to grid high tariff', value: '-1,52 kWh', cost: '-0,00 US$' },
    { label: 'Total de la red', value: '3,25 kWh', cost: '0,00 US$', bold: true },
  ]

  return (
    <div className="ev-elec-layout">
      <div className="ev-elec-main">
        <ElectricityChart />
        <SolarProductionChart />
        <SourcesTableCard rows={detailRows} />
        <DeviceUsageChart />
        <DeviceTotalChart />
        <EnergyFlowSankey />
      </div>
      <div className="ev-elec-sidebar">
        <EnergyDistribution compact />
        <GaugeCard value="3,25" label="Importación neta de la red" unit="kWh" color="#8b5cf6" max={10} />
        <GaugeCard value={80} label="Energía solar autoconsumida" unit="%" color="#22c55e" max={100} />
        <GaugeCard value={57} label="Autosuficiencia" unit="%" color="#06b6d4" max={100} />
      </div>
    </div>
  )
}

function GasTab() {
  const { devices } = useDevices()
  const e = devices.energy
  return (
    <div className="ev-simple-layout">
      <div className="ev-simple-main">
        <EmptyBarChart title="Consumo de gas" unit="m³" />
      </div>
      <div className="ev-simple-side">
        <SourcesTableCard rows={[{ label: 'Total de gas', value: `${e.gas.value} ${e.gas.unit}`, bold: true }]} />
      </div>
    </div>
  )
}

function AguaTab() {
  const { devices } = useDevices()
  const e = devices.energy
  return (
    <div className="ev-agua-layout">
      <div className="ev-simple-layout">
        <div className="ev-simple-main">
          <EmptyBarChart title="Consumo de agua" unit="L" />
        </div>
        <div className="ev-simple-side">
          <SourcesTableCard rows={[{ label: 'Agua total', value: `${e.water.value} ${e.water.unit}`, bold: true }]} />
        </div>
      </div>
      <div className="ev-card" style={{ marginTop: 12 }}>
        <div className="ev-card-title">Caudal de agua</div>
        <div className="ev-card-body"><p className="ev-empty-msg">No hay datos para este período.</p></div>
      </div>
    </div>
  )
}

function AhoraTab() {
  return (
    <div className="ev-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p className="ev-empty-msg">Datos en tiempo real no disponibles.</p>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN ENERGY VIEW
   ═══════════════════════════════════════════ */

const TABS = [
  { id: 'resumen', label: 'Resumen' },
  { id: 'electricidad', label: 'Electricidad' },
  { id: 'gas', label: 'Gas' },
  { id: 'agua', label: 'Agua' },
  { id: 'ahora', label: 'Ahora' },
]

export default function EnergyView() {
  const [activeTab, setActiveTab] = useState('resumen')

  return (
    <div className="energy-view">
      <div className="ev-tab-bar">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`ev-tab ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="ev-tab-content">
        {activeTab === 'resumen' && <ResumenTab />}
        {activeTab === 'electricidad' && <ElectricidadTab />}
        {activeTab === 'gas' && <GasTab />}
        {activeTab === 'agua' && <AguaTab />}
        {activeTab === 'ahora' && <AhoraTab />}
      </div>

      <div className="energy-footer">
        <div className="energy-date-selector">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span className="energy-date-text">7 abr</span>
          <button className="energy-now-btn">Ahora</button>
          <button className="energy-nav-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg></button>
          <button className="energy-nav-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></button>
          <button className="energy-nav-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg></button>
        </div>
      </div>
    </div>
  )
}
