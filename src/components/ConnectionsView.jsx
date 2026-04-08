import React, { useState } from 'react'
import { useDevices } from '../context/DeviceContext'
import '../styles/ConnectionsView.css'

const PROTOCOLS = {
  zigbee: { name: 'Zigbee', color: '#22c55e' },
  wifi: { name: 'Wi-Fi', color: '#3b82f6' },
  zwave: { name: 'Z-Wave', color: '#f59e0b' },
  mqtt: { name: 'MQTT', color: '#8b5cf6' },
  bluetooth: { name: 'Bluetooth', color: '#06b6d4' },
}

function buildDeviceList(devices) {
  const list = []

  Object.entries(devices.lights).forEach(([id, d]) => {
    list.push({ id: `light-${id}`, name: `Luz ${d.name}`, type: 'Luz', room: d.name, protocol: 'zigbee', active: d.on, icon: 'light' })
  })
  Object.entries(devices.thermostats).forEach(([id, d]) => {
    list.push({ id: `thermo-${id}`, name: `Termostato ${d.name}`, type: 'Termostato', room: d.name, protocol: 'zwave', active: true, icon: 'thermo' })
  })
  Object.entries(devices.curtains).forEach(([id, d]) => {
    list.push({ id: `curtain-${id}`, name: `Cortina ${d.name}`, type: 'Cortina', room: d.name, protocol: 'zigbee', active: true, icon: 'curtain' })
  })
  Object.entries(devices.cameras).forEach(([id, d]) => {
    list.push({ id: `cam-${id}`, name: d.name, type: 'Cámara', room: d.name.replace(' camera', ''), protocol: 'wifi', active: d.active, icon: 'camera' })
  })

  list.push({ id: 'tv-main', name: 'Smart TV', type: 'TV', room: 'TV', protocol: 'wifi', active: devices.tv.on, icon: 'tv' })
  list.push({ id: 'hdmi-switch', name: 'HDMI Switch (Shield)', type: 'Switch HDMI', room: 'TV', protocol: 'wifi', active: true, icon: 'tv' })
  list.push({ id: 'speaker-sala', name: 'Altavoz Salón', type: 'Altavoz', room: 'Salón', protocol: 'bluetooth', active: devices.nowPlaying.isPlaying, icon: 'speaker' })
  list.push({ id: 'hub-central', name: 'Hub Central', type: 'Hub', room: 'Hall', protocol: 'mqtt', active: true, icon: 'hub' })
  list.push({ id: 'energy-meter', name: 'Medidor de energía', type: 'Sensor', room: 'General', protocol: 'mqtt', active: true, icon: 'sensor' })
  list.push({ id: 'water-meter', name: 'Medidor de agua', type: 'Sensor', room: 'General', protocol: 'mqtt', active: true, icon: 'sensor' })
  list.push({ id: 'gas-meter', name: 'Medidor de gas', type: 'Sensor', room: 'General', protocol: 'mqtt', active: true, icon: 'sensor' })

  return list
}

const DEVICE_ICONS = {
  light: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.54 14.54A5 5 0 0 0 17 10a5 5 0 1 0-10 0c0 1.62.77 3.06 1.96 3.98"/></svg>,
  thermo: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>,
  curtain: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="3" x2="22" y2="3"/><path d="M3 3v18"/><path d="M6 3v14"/><path d="M18 3v14"/><path d="M21 3v18"/></svg>,
  camera: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 8a2 2 0 0 1 2-2h2l2-3h4l2 3h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8z"/><circle cx="10" cy="12" r="3"/><path d="M18 10l4-2v8l-4-2"/></svg>,
  tv: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>,
  speaker: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>,
  hub: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="3" r="1.5"/><circle cx="21" cy="12" r="1.5"/><circle cx="12" cy="21" r="1.5"/><circle cx="3" cy="12" r="1.5"/><line x1="12" y1="5" x2="12" y2="9"/><line x1="15" y1="12" x2="19.5" y2="12"/><line x1="12" y1="15" x2="12" y2="19.5"/><line x1="4.5" y1="12" x2="9" y2="12"/></svg>,
  sensor: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
}

const FILTERS = ['Todos', 'Luz', 'Termostato', 'Cortina', 'Cámara', 'TV', 'Sensor']

export default function ConnectionsView() {
  const { devices } = useDevices()
  const [filter, setFilter] = useState('Todos')
  const [search, setSearch] = useState('')

  const allDevices = buildDeviceList(devices)

  const filtered = allDevices.filter(d => {
    if (filter !== 'Todos' && d.type !== filter) return false
    if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.room.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const activeCount = allDevices.filter(d => d.active).length
  const totalCount = allDevices.length

  const protocolCounts = {}
  allDevices.forEach(d => {
    protocolCounts[d.protocol] = (protocolCounts[d.protocol] || 0) + 1
  })

  return (
    <div className="conn-view">
      {/* Header stats */}
      <div className="conn-stats-bar">
        <div className="conn-stat-card">
          <span className="conn-stat-value">{totalCount}</span>
          <span className="conn-stat-label">Dispositivos</span>
        </div>
        <div className="conn-stat-card">
          <span className="conn-stat-value conn-stat-green">{activeCount}</span>
          <span className="conn-stat-label">Activos</span>
        </div>
        <div className="conn-stat-card">
          <span className="conn-stat-value conn-stat-red">{totalCount - activeCount}</span>
          <span className="conn-stat-label">Inactivos</span>
        </div>
        {Object.entries(protocolCounts).map(([proto, count]) => (
          <div className="conn-stat-card" key={proto}>
            <span className="conn-stat-value" style={{ color: PROTOCOLS[proto].color }}>{count}</span>
            <span className="conn-stat-label">{PROTOCOLS[proto].name}</span>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="conn-toolbar">
        <div className="conn-filters">
          {FILTERS.map(f => (
            <button key={f} className={`conn-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <input
          type="text"
          className="conn-search"
          placeholder="Buscar dispositivo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Device table */}
      <div className="conn-table-wrapper">
        <table className="conn-table">
          <thead>
            <tr>
              <th>Dispositivo</th>
              <th>Tipo</th>
              <th>Habitación</th>
              <th>Protocolo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id} className={d.active ? '' : 'conn-row-inactive'}>
                <td className="conn-device-cell">
                  <span className="conn-device-icon">{DEVICE_ICONS[d.icon]}</span>
                  <span>{d.name}</span>
                </td>
                <td><span className="conn-type-badge">{d.type}</span></td>
                <td>{d.room}</td>
                <td>
                  <span className="conn-protocol-badge" style={{ background: `${PROTOCOLS[d.protocol].color}15`, color: PROTOCOLS[d.protocol].color, borderColor: `${PROTOCOLS[d.protocol].color}40` }}>
                    {PROTOCOLS[d.protocol].name}
                  </span>
                </td>
                <td>
                  <span className={`conn-status-badge ${d.active ? 'active' : 'inactive'}`}>
                    <span className="conn-status-dot" />
                    {d.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="conn-empty">No se encontraron dispositivos.</div>
        )}
      </div>
    </div>
  )
}
