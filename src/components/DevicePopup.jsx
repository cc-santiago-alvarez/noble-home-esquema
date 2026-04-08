import React, { useRef } from 'react'
import { useDevices } from '../context/DeviceContext'
import { usePopupClose } from './shared/usePopupClose'
import '../styles/DevicePopup.css'

export function LightPopup({ roomId, onClose }) {
  const { devices, toggleLight, setLightBrightness } = useDevices()
  const light = devices.lights[roomId]
  const ref = useRef()
  usePopupClose(ref, onClose)

  return (
    <div className="popup-overlay">
      <div className="popup" ref={ref}>
        <div className="popup-header">
          <h3>Iluminación</h3>
          <span className="popup-room">{light.name}</span>
          <button className="popup-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="popup-body">
          <div className="control-row">
            <span className="control-label">Estado</span>
            <button
              className={`toggle-switch ${light.on ? 'on' : ''}`}
              onClick={() => toggleLight(roomId)}
            >
              <span className="toggle-knob" />
            </button>
            <span className={`status-text ${light.on ? 'on' : ''}`}>
              {light.on ? 'Encendido' : 'Apagado'}
            </span>
          </div>

          <div className="control-row column">
            <div className="control-label-row">
              <span className="control-label">Intensidad</span>
              <span className="control-value">{light.brightness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={light.brightness}
              onChange={(e) => setLightBrightness(roomId, Number(e.target.value))}
              className="slider slider-light"
              disabled={!light.on}
            />
            <div className="slider-labels">
              <span>Min</span>
              <span>Max</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ThermostatPopup({ roomId, onClose }) {
  const { devices, setTemperature } = useDevices()
  const thermo = devices.thermostats[roomId]
  const ref = useRef()
  usePopupClose(ref, onClose)

  const temp = thermo.targetTemp
  const tempColor = temp <= 20 ? '#74b9ff' :
                    temp <= 24 ? '#00cec9' :
                    temp <= 27 ? '#fdcb6e' : '#ff7675'

  return (
    <div className="popup-overlay">
      <div className="popup" ref={ref}>
        <div className="popup-header">
          <h3>Termostato</h3>
          <span className="popup-room">{thermo.name}</span>
          <button className="popup-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="popup-body">
          <div className="temp-display">
            <button
              className="temp-btn"
              onClick={() => setTemperature(roomId, temp - 1)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
            <div className="temp-value" style={{ color: tempColor }}>
              <span className="temp-number">{temp}</span>
              <span className="temp-unit">°C</span>
            </div>
            <button
              className="temp-btn"
              onClick={() => setTemperature(roomId, temp + 1)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          </div>

          <div className="temp-range">
            <span>16°C</span>
            <div className="temp-bar">
              <div
                className="temp-fill"
                style={{
                  width: `${((temp - 16) / 14) * 100}%`,
                  background: `linear-gradient(90deg, #74b9ff, #00cec9, #fdcb6e, #ff7675)`,
                }}
              />
            </div>
            <span>30°C</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CurtainPopup({ roomId, onClose }) {
  const { devices, setCurtainPosition } = useDevices()
  const curtain = devices.curtains[roomId]
  const ref = useRef()
  usePopupClose(ref, onClose)

  const posLabel = curtain.position === 100 ? 'Cerrada' :
                   curtain.position === 0 ? 'Abierta' :
                   `Parcial (${curtain.position}%)`

  return (
    <div className="popup-overlay">
      <div className="popup" ref={ref}>
        <div className="popup-header">
          <h3>Cortina</h3>
          <span className="popup-room">{curtain.name}</span>
          <button className="popup-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="popup-body">
          <div className="curtain-visual">
            <div className="curtain-window">
              <div className="curtain-rail" />
              <div className="curtain-fabric" style={{ height: `${curtain.position}%` }}>
                <div className="curtain-folds" />
              </div>
            </div>
          </div>

          <div className="curtain-presets">
            <button
              className={`preset-btn ${curtain.position === 0 ? 'active' : ''}`}
              onClick={() => setCurtainPosition(roomId, 0)}
            >
              Abierta
            </button>
            <button
              className={`preset-btn ${curtain.position === 50 ? 'active' : ''}`}
              onClick={() => setCurtainPosition(roomId, 50)}
            >
              Parcial
            </button>
            <button
              className={`preset-btn ${curtain.position === 100 ? 'active' : ''}`}
              onClick={() => setCurtainPosition(roomId, 100)}
            >
              Cerrada
            </button>
          </div>

          <div className="control-row column">
            <div className="control-label-row">
              <span className="control-label">Posición</span>
              <span className="control-value">{posLabel}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={curtain.position}
              onChange={(e) => setCurtainPosition(roomId, Number(e.target.value))}
              className="slider slider-curtain"
            />
            <div className="slider-labels">
              <span>Abierta</span>
              <span>Cerrada</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CameraPopup({ roomId, onClose }) {
  const { devices, toggleCamera } = useDevices()
  const camera = devices.cameras[roomId]
  const ref = useRef()
  usePopupClose(ref, onClose)

  return (
    <div className="popup-overlay">
      <div className="popup" ref={ref}>
        <div className="popup-header">
          <h3>Cámara</h3>
          <span className="popup-room">{camera.name}</span>
          <button className="popup-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="popup-body">
          <div className="control-row">
            <span className="control-label">Estado</span>
            <button
              className={`toggle-switch ${camera.active ? 'on' : ''}`}
              onClick={() => toggleCamera(roomId)}
            >
              <span className="toggle-knob" />
            </button>
            <span className={`status-text ${camera.active ? 'on' : ''}`}>
              {camera.active ? 'Activa' : 'Inactiva'}
            </span>
          </div>

          <div className="camera-feed-placeholder">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
              <path d="M2 8a2 2 0 0 1 2-2h2l2-3h4l2 3h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8z"/>
              <circle cx="10" cy="12" r="3"/>
              <path d="M18 10l4-2v8l-4-2"/>
            </svg>
            <span>Vista previa no disponible</span>
          </div>
        </div>
      </div>
    </div>
  )
}
