import React, { useState, useRef, useCallback } from 'react'
import { usePopupClose } from './shared/usePopupClose'
import AddDevicePopup from './AddDevicePopup'
import CreateAutomationPopup from './CreateAutomationPopup'
import CreateAreaPopup from './CreateAreaPopup'
import AddPersonPopup from './AddPersonPopup'
import '../styles/AddMenu.css'

const MENU_ITEMS = [
  {
    key: 'device',
    label: 'Añadir dispositivo',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    key: 'automation',
    label: 'Crear automatización',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
  {
    key: 'area',
    label: 'Crear área',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    key: 'person',
    label: 'Añadir persona',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="8.5" cy="7" r="4"/>
        <line x1="20" y1="8" x2="20" y2="14"/>
        <line x1="23" y1="11" x2="17" y2="11"/>
      </svg>
    ),
  },
]

export default function AddMenu() {
  const [open, setOpen] = useState(false)
  const [showAddDevice, setShowAddDevice] = useState(false)
  const [showAutomation, setShowAutomation] = useState(false)
  const [showArea, setShowArea] = useState(false)
  const [showPerson, setShowPerson] = useState(false)
  const menuRef = useRef()
  const handleClose = useCallback(() => setOpen(false), [])

  usePopupClose(menuRef, handleClose)

  const handleItemClick = (key) => {
    setOpen(false)
    if (key === 'device') setShowAddDevice(true)
    if (key === 'automation') setShowAutomation(true)
    if (key === 'area') setShowArea(true)
    if (key === 'person') setShowPerson(true)
  }

  return (
    <>
      <div className="add-menu" ref={menuRef}>
        <button
          className={`add-menu-trigger ${open ? 'active' : ''}`}
          onClick={() => setOpen(prev => !prev)}
          aria-label="Añadir"
          aria-expanded={open}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>

        {open && (
          <div className="add-menu-dropdown">
            {MENU_ITEMS.map(item => (
              <button
                key={item.key}
                className="add-menu-item"
                onClick={() => handleItemClick(item.key)}
              >
                <span className="add-menu-item-icon">{item.icon}</span>
                <span className="add-menu-item-label">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {showAddDevice && (
        <AddDevicePopup onClose={() => setShowAddDevice(false)} />
      )}

      {showAutomation && (
        <CreateAutomationPopup onClose={() => setShowAutomation(false)} />
      )}

      {showArea && (
        <CreateAreaPopup onClose={() => setShowArea(false)} />
      )}

      {showPerson && (
        <AddPersonPopup onClose={() => setShowPerson(false)} />
      )}
    </>
  )
}
