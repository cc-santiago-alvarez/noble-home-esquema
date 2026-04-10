import React from 'react'
import { useDevices } from '../../context/DeviceContext'
import Carousel from '../shared/Carousel'

const VACUUM_MODES = [
  { id: 'auto', label: 'Auto' },
  { id: 'silencioso', label: 'Silencioso' },
  { id: 'turbo', label: 'Turbo' },
  { id: 'spot', label: 'Spot' },
]

const IOT_ICONS = {
  plug: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-5"/>
      <path d="M9 8V2"/>
      <path d="M15 8V2"/>
      <path d="M18 8H6a2 2 0 0 0-2 2v2c0 4 3 6 8 6s8-2 8-6v-2a2 2 0 0 0-2-2z"/>
    </svg>
  ),
  purifier: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2c3 0 5 2 8 2s4-1 4-1v11s-1 1-4 1-5-2-8-2-4 1-4 1V2s1-1 4-1z"/>
      <line x1="8" y1="22" x2="8" y2="13"/>
    </svg>
  ),
  humidifier: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    </svg>
  ),
  speaker: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  ),
  lock: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
}

function VacuumPage() {
  const { devices, toggleVacuum, setVacuumMode } = useDevices()
  const { vacuum } = devices

  return (
    <div className="vacuum-page">
      <div className="card-page-header">Aspiradora</div>
      <div className="vacuum-content">
        <div className="vacuum-status-ring">
          <svg viewBox="0 0 120 120" className="vacuum-ring-svg">
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border)" strokeWidth="6" />
            <circle
              cx="60" cy="60" r="52"
              fill="none"
              stroke={vacuum.running ? 'var(--success)' : 'var(--text-secondary)'}
              strokeWidth="6"
              strokeDasharray={`${vacuum.battery * 3.27} 327`}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
            <text x="60" y="50" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--text-primary)">
              {vacuum.battery}%
            </text>
            <text x="60" y="68" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              {vacuum.running ? 'Limpiando' : 'En espera'}
            </text>
            <text x="60" y="82" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              {vacuum.area}
            </text>
          </svg>
        </div>

        <div className="vacuum-controls">
          <button
            className={`vacuum-power-btn ${vacuum.running ? 'active' : ''}`}
            onClick={toggleVacuum}
          >
            {vacuum.running ? 'Detener' : 'Iniciar'}
          </button>
          <div className="vacuum-modes">
            {VACUUM_MODES.map(mode => (
              <button
                key={mode.id}
                className={`vacuum-mode-btn ${vacuum.mode === mode.id ? 'active' : ''}`}
                onClick={() => setVacuumMode(mode.id)}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function IoTDevicesPage() {
  const { devices, toggleIoTDevice } = useDevices()

  return (
    <div className="iot-devices-page">
      <div className="card-page-header">Dispositivos IoT</div>
      <div className="iot-devices-list">
        {Object.entries(devices.iotDevices).map(([id, device]) => {
          const isActive = device.type === 'lock' ? device.locked : device.on
          return (
            <div className="iot-device-row" key={id}>
              <div className="iot-device-info">
                <span className={`iot-device-icon ${isActive ? 'active' : ''}`}>
                  {IOT_ICONS[device.type]}
                </span>
                <div className="iot-device-text">
                  <span className="iot-device-name">{device.name}</span>
                  <span className="iot-device-status">
                    {device.type === 'lock'
                      ? (device.locked ? 'Bloqueada' : 'Desbloqueada')
                      : (device.on ? 'Encendido' : 'Apagado')
                    }
                  </span>
                </div>
              </div>
              <button
                className={`toggle-switch-sm ${isActive ? 'on' : ''}`}
                onClick={() => toggleIoTDevice(id)}
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

export default function IoTCard() {
  return (
    <Carousel>
      <VacuumPage />
      <IoTDevicesPage />
    </Carousel>
  )
}
