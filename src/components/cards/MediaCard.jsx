import React, { useState } from 'react'
import { useDevices } from '../../context/DeviceContext'
import { CameraPopup } from '../DevicePopup'
import Carousel from '../shared/Carousel'

function CamerasPage({ onOpenCamera }) {
  const { devices } = useDevices()
  const cameraOrder = ['door', 'hall', 'cocina', 'tv', 'sala']

  return (
    <div className="cameras-page">
      <div className="cameras-list">
        {cameraOrder.map((camId, idx) => {
          const cam = devices.cameras[camId]
          if (!cam) return null
          return (
            <div className="camera-row" key={camId}>
              <span className="camera-name">{cam.name}</span>
              <div className="camera-actions">
                {cam.active && (
                  <span className="camera-active-flag">
                    <span className="camera-active-dot" />
                    Active
                  </span>
                )}
                <button className="camera-icon-btn" onClick={() => onOpenCamera(camId)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 8a2 2 0 0 1 2-2h2l2-3h4l2 3h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8z"/>
                    <circle cx="10" cy="12" r="3"/>
                    <path d="M18 10l4-2v8l-4-2"/>
                  </svg>
                </button>
                {idx === 0 && (
                  <button className="camera-open-btn" onClick={() => onOpenCamera(camId)}>Open</button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TvPage() {
  const { devices, setTvProperty, turnOffTv } = useDevices()
  const tv = devices.tv

  return (
    <div className="tv-page">
      <div className="card-page-header">Tv</div>
      <div className="tv-controls">
        <div className="tv-control-row">
          <div className="tv-control-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
              <polyline points="17 2 12 7 7 2"/>
            </svg>
          </div>
          <div className="tv-control-field">
            <label className="tv-label">Actividad</label>
            <select
              className="tv-select"
              value={tv.activity}
              onChange={(e) => setTvProperty('activity', e.target.value)}
            >
              <option value="YouTube">YouTube</option>
              <option value="Netflix">Netflix</option>
              <option value="Disney+">Disney+</option>
              <option value="HBO Max">HBO Max</option>
            </select>
          </div>
        </div>

        <div className="tv-control-row">
          <div className="tv-control-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M6 8h.01M6 12h.01M6 16h.01M10 8h8M10 12h8M10 16h8"/>
            </svg>
          </div>
          <div className="tv-control-field">
            <label className="tv-label">Conmutador HDMI</label>
            <select
              className="tv-select"
              value={tv.hdmiSwitcher}
              onChange={(e) => setTvProperty('hdmiSwitcher', e.target.value)}
            >
              <option value="Shield">Shield</option>
              <option value="Chromecast">Chromecast</option>
              <option value="Apple TV">Apple TV</option>
            </select>
          </div>
        </div>

        <div className="tv-control-row">
          <div className="tv-control-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7h16M4 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </div>
          <div className="tv-control-field">
            <label className="tv-label">Entrada HDMI</label>
            <select
              className="tv-select"
              value={tv.hdmiInput}
              onChange={(e) => setTvProperty('hdmiInput', e.target.value)}
            >
              <option value="InputHdmi1">InputHdmi1</option>
              <option value="InputHdmi2">InputHdmi2</option>
              <option value="InputHdmi3">InputHdmi3</option>
              <option value="InputHdmi4">InputHdmi4</option>
            </select>
          </div>
        </div>

        <div className="tv-info-row">
          <div className="tv-control-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          </div>
          <span className="tv-info-label">Volumen</span>
          <span className="tv-info-value">{tv.volume}</span>
        </div>

        <div className="tv-info-row">
          <div className="tv-control-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <span className="tv-info-label">Tiempo total de TV</span>
          <span className="tv-info-value">{tv.totalTime}</span>
        </div>

        <div className="tv-info-row">
          <div className="tv-control-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <span className="tv-info-label">Apagar la televisión</span>
          <button className="tv-execute-btn" onClick={turnOffTv}>Ejecutar</button>
        </div>
      </div>
    </div>
  )
}

function NowPlayingPage() {
  const { devices, togglePlayback } = useDevices()
  const np = devices.nowPlaying

  return (
    <div className="now-playing-page">
      <div className="now-playing-info">
        <div className="now-playing-room">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
            <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
            <circle cx="12" cy="20" r="1"/>
          </svg>
          <span>{np.room}</span>
        </div>
        <div className="now-playing-track">
          <h3 className="now-playing-title">{np.title}</h3>
          <p className="now-playing-artist">{np.artist}</p>
        </div>
        <div className="now-playing-controls">
          <button className="np-control-btn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M19 20L9 12l10-8v16zM7 19H5V5h2v14z"/>
            </svg>
          </button>
          <button className="np-control-btn np-play-btn" onClick={togglePlayback}>
            {np.isPlaying ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          <button className="np-control-btn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M5 4l10 8-10 8V4zM17 5h2v14h-2V5z"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="now-playing-art">
        <div className="now-playing-art-placeholder">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--icon-placeholder)" stroke="none">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="3" fill="var(--chart-grid-strong)"/>
          </svg>
          <span className="now-playing-album-text">{np.album}</span>
        </div>
      </div>
    </div>
  )
}

export default function MediaCard() {
  const [cameraPopup, setCameraPopup] = useState(null)

  return (
    <>
      <Carousel>
        <CamerasPage onOpenCamera={(camId) => setCameraPopup(camId)} />
        <TvPage />
        <NowPlayingPage />
      </Carousel>
      {cameraPopup && (
        <CameraPopup roomId={cameraPopup} onClose={() => setCameraPopup(null)} />
      )}
    </>
  )
}
