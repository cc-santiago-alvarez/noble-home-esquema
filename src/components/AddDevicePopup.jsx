import React, { useState, useRef, useCallback } from 'react'
import { usePopupClose } from './shared/usePopupClose'
import '../styles/AddDevicePopup.css'

const BRANDS = [
  { key: 'philips-hue', name: 'Philips Hue', color: '#0065D3' },
  { key: 'tp-link',     name: 'TP-Link',     color: '#4ABFA5' },
  { key: 'shelly',      name: 'Shelly',       color: '#4BA3E3' },
  { key: 'sonoff',      name: 'Sonoff',       color: '#E8453C' },
  { key: 'tuya',        name: 'Tuya',         color: '#FF6B2B' },
  { key: 'aqara',       name: 'Aqara',        color: '#7B8794' },
  { key: 'ring',        name: 'Ring',         color: '#1C9AD6' },
  { key: 'xiaomi',      name: 'Xiaomi',       color: '#FF6900' },
  { key: 'ikea',        name: 'IKEA',         color: '#0058A3' },
]

function BrandInitials(name) {
  const words = name.split(/[\s-]+/)
  if (words.length === 1) return name.slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

function BrandSelectStep({ onSelect }) {
  const [search, setSearch] = useState('')
  const filtered = BRANDS.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="brand-search-wrapper">
        <svg className="brand-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          className="brand-search-input"
          type="text"
          placeholder="Buscar marca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
      </div>
      <div className="brand-grid">
        {filtered.map(brand => (
          <button
            key={brand.key}
            className="brand-card"
            onClick={() => onSelect(brand)}
          >
            <span className="brand-logo" style={{ background: brand.color }}>
              {BrandInitials(brand.name)}
            </span>
            <span className="brand-name">{brand.name}</span>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="brand-no-results">Sin resultados</p>
        )}
      </div>
    </>
  )
}

function QrScanStep({ brand, onBack }) {
  return (
    <>
      <div className="qr-step-header">
        <div className="qr-step-brand">
          <span className="qr-step-brand-logo" style={{ background: brand.color }}>
            {BrandInitials(brand.name)}
          </span>
          <span className="qr-step-brand-name">{brand.name}</span>
        </div>
      </div>

      <div className="qr-scan-area">
        <div className="qr-corners">
          <div className="qr-corners-bottom" />
        </div>
        <svg className="qr-scan-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
          <rect x="17" y="17" width="4" height="4"/>
          <line x1="14" y1="14" x2="14" y2="17"/>
          <line x1="14" y1="14" x2="17" y2="14"/>
        </svg>
        <span className="qr-scan-text">Escanea el código QR del dispositivo</span>
        <span className="qr-scan-hint">Ubicalo en la parte inferior o en el manual</span>
      </div>

      <button className="qr-back-btn" onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Cambiar marca
      </button>
    </>
  )
}

export default function AddDevicePopup({ onClose }) {
  const [selectedBrand, setSelectedBrand] = useState(null)
  const ref = useRef()
  const handleClose = useCallback(() => onClose(), [onClose])

  usePopupClose(ref, handleClose)

  return (
    <div className="popup-overlay add-device-popup">
      <div className="popup" ref={ref}>
        <div className="popup-header">
          <h3>Añadir dispositivo</h3>
          <button className="popup-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="popup-body">
          {selectedBrand === null ? (
            <BrandSelectStep onSelect={setSelectedBrand} />
          ) : (
            <QrScanStep brand={selectedBrand} onBack={() => setSelectedBrand(null)} />
          )}
        </div>
      </div>
    </div>
  )
}
