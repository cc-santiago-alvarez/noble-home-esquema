import React, { useState } from 'react'
import { useDevices } from '../context/DeviceContext'
import { useTheme } from '../context/ThemeContext'
import { LightIcon, ThermostatIcon, CurtainIcon, CameraIcon } from './DeviceIcons'
import { LightPopup, ThermostatPopup, CurtainPopup, CameraPopup } from './DevicePopup'
import '../styles/HomeView.css'

/*
 * Room layout matching the reference image:
 *  - WC (top-left, small bathroom)
 *  - Cocina (top-center-left)
 *  - Comedor (top-center-right)
 *  - Alcoba 2 (top-right, bedroom)
 *  - Hall (left-center)
 *  - Alcoba 1 (center, enclosed bedroom)
 *  - TV (right-center area)
 *  - Sala (bottom-left, living room)
 *  - Alcoba 3 (bottom-right, bedroom)
 */

const ROOMS = [
  { id: 'wc',        name: 'WC',        x: 15,   y: 15 },
  { id: 'cocina',    name: 'Cocina',    x: 34,   y: 12 },
  { id: 'comedor',   name: 'Comedor',   x: 52,   y: 12 },
  { id: 'alcoba-2',  name: 'Alcoba 2',  x: 74,   y: 10 },
  { id: 'hall',      name: 'Hall',      x: 22,   y: 36 },
  { id: 'alcoba-1',  name: 'Alcoba 1',  x: 44,   y: 46 },
  { id: 'tv',        name: 'TV',        x: 74,   y: 49 },
  { id: 'sala',      name: 'Sala',      x: 48,   y: 76 },
  { id: 'alcoba-3',  name: 'Alcoba 3',  x: 76,   y: 75 },
]

// Device placements — positions relative to the floor plan container (%)
const DEVICE_POSITIONS = {
  lights: {
    'wc':          { x: 16,   y: 21 },
    'cocina':      { x: 32,   y: 19 },
    'comedor':     { x: 54,   y: 19 },
    'alcoba-2':    { x: 72,   y: 18 },
    'hall':        { x: 18,   y: 42 },
    'alcoba-1':    { x: 39,   y: 53 },
    'tv':          { x: 70,   y: 42 },
    'sala':        { x: 45,   y: 70 },
    'alcoba-3':    { x: 70,   y: 70 },
  },
  thermostats: {
    'cocina':    { x: 45,   y: 19 },
    'alcoba-2':  { x: 76,   y: 18 },
    'alcoba-1':  { x: 43,   y: 53 },
    'tv':        { x: 74,   y: 42 },
    'sala':      { x: 49,   y: 70 },
    'alcoba-3':  { x: 74,   y: 70 },
  },
  curtains: {
    'alcoba-2':  { x: 80,   y: 18 },
    'alcoba-1':  { x: 47,   y: 53 },
    'alcoba-3':  { x: 78,   y: 70 },
    'tv':        { x: 78,   y: 42 },
    'sala':      { x: 53,   y: 70 },
  },
  cameras: {
    'exterior-nw': { x: 25,  y: 14 },
    'exterior-ne': { x: 57, y: 45 },
    // 'exterior-w1': { x: 5,  y: 32 },
    'exterior-w2': { x: 20,  y: 50 },
    'exterior-sw': { x: 44,  y: 92 },
    'exterior-se': { x: 89, y: 52 },
  },
}

export default function HomeView() {
  const { devices } = useDevices()
  const { theme } = useTheme()
  const [popup, setPopup] = useState(null)

  const openPopup = (type, roomId) => setPopup({ type, roomId })
  const closePopup = () => setPopup(null)

  return (
    <div className="home-view">
      <div className="home-header">
        <h1>Planta del Hogar</h1>
        <div className="home-stats">
          <div className="stat">
            <span className="stat-value">
              {Object.values(devices.lights).filter(l => l.on).length}
            </span>
            <span className="stat-label">Luces encendidas</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {Math.round(Object.values(devices.thermostats).reduce((a, t) => a + t.temperature, 0) / Object.values(devices.thermostats).length)}°C
            </span>
            <span className="stat-label">Temp. promedio</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {Object.values(devices.curtains).filter(c => c.position < 100).length}
            </span>
            <span className="stat-label">Cortinas abiertas</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {Object.values(devices.cameras).filter(c => c.active).length}
            </span>
            <span className="stat-label">Cámaras activas</span>
          </div>
        </div>
      </div>

      <div className="floorplan-container">
        <div className="floorplan-wrapper">
          {/* Floor plan SVG */}
          <img src={theme === 'light' ? '/PLANTA_black.png' : '/PLANTA.svg'} alt="Planta del hogar" className="floorplan-img" draggable={false} />

          {/* Room name cards */}
          {ROOMS.map(room => (
            <div
              key={room.id}
              className="room-card"
              style={{
                left: `${room.x}%`,
                top: `${room.y}%`,
              }}
            >
              <span className="room-name">{room.name}</span>
            </div>
          ))}

          {/* Light icons */}
          {Object.entries(DEVICE_POSITIONS.lights).map(([roomId, pos]) => (
            <button
              key={`light-${roomId}`}
              className={`device-btn device-light ${devices.lights[roomId].on ? 'on' : ''}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => openPopup('light', roomId)}
              title={`Luz - ${devices.lights[roomId].name}`}
            >
              <LightIcon on={devices.lights[roomId].on} size={20} />
            </button>
          ))}

          {/* Thermostat icons */}
          {Object.entries(DEVICE_POSITIONS.thermostats).map(([roomId, pos]) => (
            <button
              key={`thermo-${roomId}`}
              className="device-btn device-thermo"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => openPopup('thermostat', roomId)}
              title={`Termostato - ${devices.thermostats[roomId].name}`}
            >
              <ThermostatIcon size={20} />
            </button>
          ))}

          {/* Curtain icons */}
          {Object.entries(DEVICE_POSITIONS.curtains).map(([roomId, pos]) => (
            <button
              key={`curtain-${roomId}`}
              className="device-btn device-curtain"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => openPopup('curtain', roomId)}
              title={`Cortina - ${devices.curtains[roomId].name}`}
            >
              <CurtainIcon position={devices.curtains[roomId].position} size={20} />
            </button>
          ))}

          {/* Camera icons */}
          {Object.entries(DEVICE_POSITIONS.cameras).map(([cameraId, pos]) => (
            <button
              key={`camera-${cameraId}`}
              className={`device-btn device-camera ${devices.cameras[cameraId].active ? 'active' : ''}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => openPopup('camera', cameraId)}
              title={`Cámara - ${devices.cameras[cameraId].name}`}
            >
              <CameraIcon active={devices.cameras[cameraId].active} size={20} />
            </button>
          ))}
        </div>
      </div>

      {/* Popups */}
      {popup?.type === 'light' && (
        <LightPopup roomId={popup.roomId} onClose={closePopup} />
      )}
      {popup?.type === 'thermostat' && (
        <ThermostatPopup roomId={popup.roomId} onClose={closePopup} />
      )}
      {popup?.type === 'curtain' && (
        <CurtainPopup roomId={popup.roomId} onClose={closePopup} />
      )}
      {popup?.type === 'camera' && (
        <CameraPopup roomId={popup.roomId} onClose={closePopup} />
      )}
    </div>
  )
}
