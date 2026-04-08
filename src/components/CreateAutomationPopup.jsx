import React, { useRef, useCallback } from 'react'
import { usePopupClose } from './shared/usePopupClose'
import '../styles/CreateAutomationPopup.css'

export default function CreateAutomationPopup({ onClose }) {
  const ref = useRef()
  const handleClose = useCallback(() => onClose(), [onClose])
  usePopupClose(ref, handleClose)

  return (
    <div className="popup-overlay create-automation-popup">
      <div className="popup" ref={ref}>
        <div className="popup-header">
          <h3>Crear automatización</h3>
          <button className="popup-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="automation-options">
          <button className="automation-option">
            <span className="automation-option-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </span>
            <span className="automation-option-text">
              <span className="automation-option-title">Crear nueva automatización</span>
              <span className="automation-option-desc">Comenzar con una automatización vacía desde cero</span>
            </span>
            <span className="automation-option-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </span>
          </button>

          <button className="automation-option">
            <span className="automation-option-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </span>
            <span className="automation-option-text">
              <span className="automation-option-title">Crear a partir de un plano</span>
              <span className="automation-option-desc">Descubre planos de la comunidad</span>
            </span>
            <span className="automation-option-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
