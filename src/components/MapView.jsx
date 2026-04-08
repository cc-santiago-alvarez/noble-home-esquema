import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '../styles/MapView.css'

// Fix leaflet default icon issue with bundlers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const HOUSES = [
  {
    id: 'casa-a',
    name: 'Casa A',
    status: 'Conectado',
    lat: 6.2518,
    lng: -75.5636,
    address: 'Calle 10 #43-12, El Poblado, Medellín',
    devices: { lights: 9, thermostats: 5, cameras: 5 },
  },
  {
    id: 'casa-b',
    name: 'Casa B',
    status: 'Conectado',
    lat: 6.2105,
    lng: -75.5710,
    address: 'Cra 43A #1-50, Envigado, Medellín',
    devices: { lights: 6, thermostats: 3, cameras: 3 },
  },
  {
    id: 'casa-c',
    name: 'Casa C',
    status: 'Desconectado',
    lat: 6.2680,
    lng: -75.5750,
    address: 'Calle 52 #49-20, Laureles, Medellín',
    devices: { lights: 4, thermostats: 2, cameras: 2 },
  },
]

function createHouseIcon(status) {
  const color = status === 'Conectado' ? '#22c55e' : '#ef4444'
  return L.divIcon({
    className: 'map-house-marker',
    html: `<div style="background:${color};width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none"><path d="M3 12l9-9 9 9v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z"/></svg>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
}

function FlyToHouse({ lat, lng }) {
  const map = useMap()
  React.useEffect(() => {
    if (lat && lng) map.flyTo([lat, lng], 15, { duration: 1 })
  }, [lat, lng, map])
  return null
}

export default function MapView() {
  const [selected, setSelected] = useState(null)
  const center = [6.2442, -75.5735]

  return (
    <div className="map-view">
      <div className="map-sidebar">
        <div className="map-sidebar-title">Ubicaciones</div>
        <div className="map-house-list">
          {HOUSES.map(h => (
            <button
              key={h.id}
              className={`map-house-item ${selected === h.id ? 'active' : ''}`}
              onClick={() => setSelected(h.id)}
            >
              <div className="map-house-status-dot" style={{ background: h.status === 'Conectado' ? '#22c55e' : '#ef4444' }} />
              <div className="map-house-info">
                <span className="map-house-name">{h.name}</span>
                <span className="map-house-address">{h.address}</span>
                <span className={`map-house-status ${h.status === 'Conectado' ? 'online' : 'offline'}`}>{h.status}</span>
              </div>
            </button>
          ))}
        </div>
        {selected && (() => {
          const h = HOUSES.find(x => x.id === selected)
          if (!h) return null
          return (
            <div className="map-house-detail">
              <div className="map-detail-header">{h.name}</div>
              <div className="map-detail-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>{h.address}</span>
              </div>
              <div className="map-detail-stats">
                <div className="map-stat"><span className="map-stat-val">{h.devices.lights}</span><span className="map-stat-lbl">Luces</span></div>
                <div className="map-stat"><span className="map-stat-val">{h.devices.thermostats}</span><span className="map-stat-lbl">Termostatos</span></div>
                <div className="map-stat"><span className="map-stat-val">{h.devices.cameras}</span><span className="map-stat-lbl">Cámaras</span></div>
              </div>
            </div>
          )
        })()}
      </div>
      <div className="map-container">
        <MapContainer center={center} zoom={13} className="map-leaflet" scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {selected && (() => {
            const h = HOUSES.find(x => x.id === selected)
            return h ? <FlyToHouse lat={h.lat} lng={h.lng} /> : null
          })()}
          {HOUSES.map(h => (
            <Marker
              key={h.id}
              position={[h.lat, h.lng]}
              icon={createHouseIcon(h.status)}
              eventHandlers={{ click: () => setSelected(h.id) }}
            >
              <Popup>
                <strong>{h.name}</strong><br />
                {h.address}<br />
                <span style={{ color: h.status === 'Conectado' ? '#22c55e' : '#ef4444' }}>{h.status}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
