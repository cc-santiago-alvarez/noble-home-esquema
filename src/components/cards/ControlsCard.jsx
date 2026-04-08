import React from 'react'
import { useDevices } from '../../context/DeviceContext'
import Carousel from '../shared/Carousel'
import ThermostatDial from '../shared/ThermostatDial'

const LIGHT_ICONS = {
  entrada: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
      <polyline points="10 17 15 12 10 7"/>
      <line x1="15" y1="12" x2="3" y2="12"/>
    </svg>
  ),
  hall: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  wc: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
    </svg>
  ),
  cocina: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
      <line x1="6" y1="1" x2="6" y2="4"/>
      <line x1="10" y1="1" x2="10" y2="4"/>
      <line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  ),
  comedor: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="1" x2="8" y2="4"/>
      <line x1="12" y1="1" x2="12" y2="4"/>
      <line x1="16" y1="1" x2="16" y2="4"/>
      <path d="M4 11h16a1 1 0 0 1 1 1v.5a5.5 5.5 0 0 1-5.5 5.5h-7A5.5 5.5 0 0 1 3 12.5V12a1 1 0 0 1 1-1z"/>
      <line x1="6" y1="18" x2="6" y2="23"/>
      <line x1="18" y1="18" x2="18" y2="23"/>
    </svg>
  ),
  'alcoba-1': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4v16"/>
      <path d="M2 8h18a2 2 0 0 1 2 2v10"/>
      <path d="M2 17h20"/>
      <path d="M6 8v9"/>
    </svg>
  ),
  'alcoba-2': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4v16"/>
      <path d="M2 8h18a2 2 0 0 1 2 2v10"/>
      <path d="M2 17h20"/>
      <path d="M6 8v9"/>
    </svg>
  ),
  'alcoba-3': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4v16"/>
      <path d="M2 8h18a2 2 0 0 1 2 2v10"/>
      <path d="M2 17h20"/>
      <path d="M6 8v9"/>
    </svg>
  ),
  tv: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
      <polyline points="17 2 12 7 7 2"/>
    </svg>
  ),
}

function LightsPage() {
  const { devices, toggleLight } = useDevices()

  const lightOrder = ['entrada', 'hall', 'wc', 'cocina', 'comedor', 'alcoba-1', 'alcoba-2', 'alcoba-3', 'tv']

  return (
    <div className="lights-page">
      <div className="card-page-header">Ligths</div>
      <div className="lights-list">
        {lightOrder.map(roomId => {
          const light = devices.lights[roomId]
          if (!light) return null
          return (
            <div className="light-row" key={roomId}>
              <div className="light-info">
                <span className="light-icon">{LIGHT_ICONS[roomId]}</span>
                <span className="light-name">{light.name}</span>
              </div>
              <button
                className={`toggle-switch-sm ${light.on ? 'on' : ''}`}
                onClick={() => toggleLight(roomId)}
              >
                <span className="toggle-knob-sm" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TemperaturePage() {
  const { devices, setTemperature, setCurtainPosition } = useDevices()

  const thermoOrder = ['alcoba-1', 'alcoba-2', 'alcoba-3', 'sala', 'tv']
  const curtainOrder = ['alcoba-1', 'alcoba-2', 'alcoba-3', 'tv', 'sala']

  return (
    <div className="temperature-page">
      <div className="card-page-header">Temperature</div>
      <div className="thermostat-grid">
        {thermoOrder.map(roomId => {
          const thermo = devices.thermostats[roomId]
          if (!thermo) return null
          return (
            <ThermostatDial
              key={roomId}
              roomName={thermo.name}
              currentTemp={thermo.currentTemp}
              targetTemp={thermo.targetTemp}
              mode={thermo.mode}
              onIncrease={() => setTemperature(roomId, thermo.targetTemp + 1)}
              onDecrease={() => setTemperature(roomId, thermo.targetTemp - 1)}
            />
          )
        })}
      </div>
      <div className="curtains-section">
        <div className="curtains-section-title">Ventanas</div>
        <div className="curtains-check-list">
          {curtainOrder.map(roomId => {
            const curtain = devices.curtains[roomId]
            if (!curtain) return null
            const isOpen = curtain.position < 100
            return (
              <div className="curtain-check-row" key={roomId}>
                <span className="curtain-check-name">{curtain.name}</span>
                <button
                  className={`toggle-switch-sm ${isOpen ? 'on' : ''}`}
                  onClick={() => setCurtainPosition(roomId, isOpen ? 100 : 0)}
                >
                  <span className="toggle-knob-sm" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function ControlsCard() {
  return (
    <Carousel>
      <LightsPage />
      <TemperaturePage />
    </Carousel>
  )
}
