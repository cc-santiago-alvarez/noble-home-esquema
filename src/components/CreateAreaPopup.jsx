import React, { useState, useRef, useCallback } from 'react'
import { usePopupClose } from './shared/usePopupClose'
import '../styles/CreateAreaPopup.css'

export default function CreateAreaPopup({ onClose }) {
  const [name, setName] = useState('')
  const [aliasOpen, setAliasOpen] = useState(true)
  const ref = useRef()
  const handleClose = useCallback(() => onClose(), [onClose])
  usePopupClose(ref, handleClose)

  return (
    <div className="popup-overlay create-area-popup">
      <div className="popup" ref={ref}>
        <div className="popup-header">
          <h3>Crear área</h3>
          <button className="popup-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="area-form">
          {/* Nombre */}
          <div className="area-field">
            <input
              className="area-input"
              type="text"
              placeholder="Nombre*"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          {/* Icono */}
          <div className="area-field">
            <div className="area-select">
              <span className="area-select-label">Icono</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>

          {/* Planta */}
          <div className="area-field">
            <div className="area-select">
              <span className="area-select-label">Planta</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>

          {/* Etiquetas */}
          <div className="area-section">
            <span className="area-section-label">Etiquetas</span>
            <div className="area-field">
              <button className="area-tag-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="9" x2="20" y2="9"/>
                  <line x1="4" y1="15" x2="20" y2="15"/>
                  <line x1="10" y1="3" x2="8" y2="21"/>
                  <line x1="16" y1="3" x2="14" y2="21"/>
                </svg>
                <span>Añadir etiqueta</span>
              </button>
            </div>
          </div>

          {/* Imagen */}
          <div className="area-upload">
            <div className="area-upload-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            <span className="area-upload-label">Añadir imagen</span>
            <span className="area-upload-hint">
              Suelta su archivo aquí o <span className="area-upload-link">selecciona entre los medios</span>
            </span>
            <span className="area-upload-formats">Admite imágenes JPEG, PNG o GIF.</span>
          </div>

          {/* Alias */}
          <div className="area-alias-section">
            <button className="area-alias-header" onClick={() => setAliasOpen(prev => !prev)}>
              <span className="area-alias-title">Alias</span>
              <svg
                className={`area-alias-chevron ${aliasOpen ? 'open' : ''}`}
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {aliasOpen && (
              <div className="area-alias-body">
                <p className="area-alias-desc">
                  Los alias son nombres alternativos utilizados en los asistentes de voz para referirse a este área.
                </p>
                <button className="area-add-alias-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  <span>Añadir alias</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="area-footer">
          <button className="area-cancel-btn" onClick={onClose}>Cancelar</button>
          <button className="area-create-btn" disabled={!name.trim()}>Crear</button>
        </div>
      </div>
    </div>
  )
}
