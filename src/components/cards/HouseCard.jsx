import React, { useState } from 'react'
import { useDevices } from '../../context/DeviceContext'
import { LightIcon, ThermostatIcon, CurtainIcon, CameraIcon } from '../DeviceIcons'
import { LightPopup, ThermostatPopup, CurtainPopup, CameraPopup } from '../DevicePopup'

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
    'door':    { x: 10,  y: 36 },
    'hall':    { x: 20,  y: 52 },
    'cocina':  { x: 26,  y: 10 },
    'tv':      { x: 58,  y: 42 },
    'sala':    { x: 33,  y: 70 },
  },
}

export default function HouseCard() {
  const { devices } = useDevices()
  const [popup, setPopup] = useState(null)

  const openPopup = (type, roomId) => setPopup({ type, roomId })
  const closePopup = () => setPopup(null)

  return (
    <div className="house-card">
      <div className="card-header">House</div>
      <div className="card-body house-card-body">
        <div className="house-floorplan-wrapper">
          <img src="/PLANTA.svg" alt="Planta del hogar" className="house-floorplan-img" draggable={false} />

          {ROOMS.map(room => (
            <div
              key={room.id}
              className="house-room-card"
              style={{ left: `${room.x}%`, top: `${room.y}%` }}
            >
              <span className="house-room-name">{room.name}</span>
            </div>
          ))}

          {Object.entries(DEVICE_POSITIONS.lights).map(([roomId, pos]) => (
            devices.lights[roomId] && (
              <button
                key={`light-${roomId}`}
                className={`house-device-btn ${devices.lights[roomId].on ? 'on' : ''}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onClick={() => openPopup('light', roomId)}
                title={`Luz - ${devices.lights[roomId].name}`}
              >
                <LightIcon on={devices.lights[roomId].on} size={14} />
              </button>
            )
          ))}

          {Object.entries(DEVICE_POSITIONS.thermostats).map(([roomId, pos]) => {
            const thermo = devices.thermostats[roomId]
            if (!thermo) return null
            const t = thermo.targetTemp
            const tempClass = t <= 20 ? 'temp-cold' : t <= 24 ? 'temp-comfort' : t <= 27 ? 'temp-warm' : 'temp-hot'
            return (
              <button
                key={`thermo-${roomId}`}
                className={`house-device-btn house-thermo ${tempClass}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onClick={() => openPopup('thermostat', roomId)}
                title={`Termostato - ${thermo.name}`}
              >
                <ThermostatIcon size={14} />
              </button>
            )
          })}

          {Object.entries(DEVICE_POSITIONS.curtains).map(([roomId, pos]) => {
            const curtain = devices.curtains[roomId]
            if (!curtain) return null
            const isOpen = curtain.position < 100
            return (
              <button
                key={`curtain-${roomId}`}
                className={`house-device-btn house-curtain ${isOpen ? 'open' : ''}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onClick={() => openPopup('curtain', roomId)}
                title={`Cortina - ${curtain.name}`}
              >
                <CurtainIcon position={curtain.position} size={14} />
              </button>
            )
          })}

          {Object.entries(DEVICE_POSITIONS.cameras).map(([cameraId, pos]) => (
            devices.cameras[cameraId] && (
              <button
                key={`camera-${cameraId}`}
                className={`house-device-btn house-camera ${devices.cameras[cameraId].active ? 'active' : ''}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onClick={() => openPopup('camera', cameraId)}
                title={`Cámara - ${devices.cameras[cameraId].name}`}
              >
                <CameraIcon active={devices.cameras[cameraId].active} size={14} />
              </button>
            )
          ))}
        </div>
      </div>

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
