import React, { useState, useRef, useCallback } from 'react'
import { usePopupClose } from './shared/usePopupClose'
import '../styles/AddPersonPopup.css'

export default function AddPersonPopup({ onClose }) {
  const [name, setName] = useState('')
  const [loginEnabled, setLoginEnabled] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [localOnly, setLocalOnly] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const ref = useRef()
  const handleClose = useCallback(() => onClose(), [onClose])
  usePopupClose(ref, handleClose)

  const canSubmit = loginEnabled
    ? name.trim() && displayName.trim() && username.trim() && password && password === confirmPassword
    : name.trim()

  return (
    <div className="popup-overlay add-person-popup">
      <div className="popup" ref={ref}>
        <div className="popup-header">
          <h3>{loginEnabled ? 'Añadir usuario' : 'Añadir persona'}</h3>
          <button className="popup-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="person-form">
          {!loginEnabled && (
            <>
              {/* Nombre */}
              <input
                className="person-input"
                type="text"
                placeholder="Nombre*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />

              {/* Upload imagen */}
              <div className="person-upload">
                <div className="person-upload-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <span className="person-upload-label">Añadir imagen</span>
                <span className="person-upload-hint">
                  Suelta su archivo aquí o <span className="person-upload-link">selecciona entre los medios</span>
                </span>
                <span className="person-upload-formats">Admite imágenes JPEG, PNG o GIF.</span>
              </div>

              {/* Permitir inicio de sesión */}
              <div className="person-toggle-row">
                <div className="person-toggle-text">
                  <span className="person-toggle-title">Permitir inicio de sesión</span>
                  <span className="person-toggle-desc">Permitir el acceso mediante usuario y contraseña.</span>
                </div>
                <button
                  className={`toggle-switch ${loginEnabled ? 'on' : ''}`}
                  onClick={() => setLoginEnabled(true)}
                >
                  <span className="toggle-knob" />
                </button>
              </div>

              {/* Selector de dispositivos */}
              <div className="person-section">
                <span className="person-section-label">Selecciona los dispositivos que pertenecen a esta persona</span>
                <div className="person-select">
                  <span className="person-select-label">Selecciona una entidad</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>
            </>
          )}

          {loginEnabled && (
            <>
              {/* Nombre para mostrar */}
              <input
                className="person-input"
                type="text"
                placeholder="Nombre para mostrar*"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoFocus
              />

              {/* Nombre de usuario */}
              <input
                className="person-input"
                type="text"
                placeholder="Nombre de usuario*"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              {/* Contraseña */}
              <div className="person-password-field">
                <input
                  className="person-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="person-eye-btn" onClick={() => setShowPassword(p => !p)}>
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* Confirmar contraseña */}
              <div className="person-password-field">
                <input
                  className="person-input"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirmar contraseña*"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="person-eye-btn" onClick={() => setShowConfirm(p => !p)}>
                  {showConfirm ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* Sólo acceso local */}
              <div className="person-toggle-row">
                <div className="person-toggle-text">
                  <span className="person-toggle-title">Sólo acceso local</span>
                  <span className="person-toggle-desc">Solo puede iniciar sesión desde la red local.</span>
                </div>
                <button
                  className={`toggle-switch ${localOnly ? 'on' : ''}`}
                  onClick={() => setLocalOnly(p => !p)}
                >
                  <span className="toggle-knob" />
                </button>
              </div>

              {/* Administrador */}
              <div className="person-toggle-row">
                <div className="person-toggle-text">
                  <span className="person-toggle-title">Administrador</span>
                  <span className="person-toggle-desc">Los administradores pueden gestionar usuarios, dispositivos, automatizaciones y paneles.</span>
                </div>
                <button
                  className={`toggle-switch ${isAdmin ? 'on' : ''}`}
                  onClick={() => setIsAdmin(p => !p)}
                >
                  <span className="toggle-knob" />
                </button>
              </div>

              {/* Info banner */}
              <div className="person-info-banner">
                <svg className="person-info-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <p>El grupo de usuarios es un trabajo en curso. El usuario no podrá administrar la instancia a través de la IU. Todavía estamos auditando todos los endpoints de la API de administración para garantizar que se limita correctamente el acceso sólo a los administradores.</p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="person-footer">
          <button className="person-cancel-btn" onClick={onClose}>Cancelar</button>
          <button className="person-submit-btn" disabled={!canSubmit}>
            {loginEnabled ? 'Crear' : 'Añadir'}
          </button>
        </div>
      </div>
    </div>
  )
}
