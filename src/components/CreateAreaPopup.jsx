import React, { useState, useRef, useCallback } from 'react'
import { usePopupClose } from './shared/usePopupClose'
import '../styles/CreateAreaPopup.css'

/* ─── Create Plant Sub-Modal ─── */
function CreatePlantPopup({ onClose, onCreate }) {
  const [plantName, setPlantName] = useState('')
  const ref = useRef()
  const handleClose = useCallback(() => onClose(), [onClose])
  usePopupClose(ref, handleClose)

  return (
    <div className="popup-overlay area-sub-overlay">
      <div className="popup area-sub-popup" ref={ref}>
        <div className="popup-header">
          <h3>Crear planta</h3>
          <button className="popup-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className="area-form">
          <div className="area-field">
            <input
              className="area-input"
              type="text"
              placeholder="Nombre de la planta*"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="area-field">
            <input
              className="area-input"
              type="number"
              placeholder="Nivel (ej: 0 = planta baja, 1 = primer piso)"
            />
          </div>
        </div>
        <div className="area-footer">
          <button className="area-cancel-btn" onClick={onClose}>Cancelar</button>
          <button
            className="area-create-btn"
            disabled={!plantName.trim()}
            onClick={() => { onCreate(plantName.trim()); onClose() }}
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Plant Dropdown ─── */
function PlantDropdown({ plants, selected, onSelect, onCreateNew }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef()

  const filtered = plants.filter(p => p.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="area-field area-plant-field" ref={ref}>
      <div className="area-select" onClick={() => setOpen(!open)}>
        <span className="area-select-label">{selected || 'Planta'}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
      {open && (
        <div className="area-plant-dropdown">
          <div className="area-plant-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
          <div className="area-plant-list">
            {filtered.length === 0 && (
              <div className="area-plant-empty">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
                <span>No hay plantas disponibles</span>
              </div>
            )}
            {filtered.map(p => (
              <button key={p} className="area-plant-item" onClick={() => { onSelect(p); setOpen(false) }}>
                {p}
              </button>
            ))}
          </div>
          <button className="area-plant-add" onClick={() => { setOpen(false); onCreateNew() }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span>Añadir nueva planta...</span>
          </button>
        </div>
      )}
    </div>
  )
}

/* ─── Main CreateAreaPopup ─── */
export default function CreateAreaPopup({ onClose }) {
  const [name, setName] = useState('')
  const [aliasOpen, setAliasOpen] = useState(true)
  const [plants, setPlants] = useState([])
  const [selectedPlant, setSelectedPlant] = useState('')
  const [showCreatePlant, setShowCreatePlant] = useState(false)
  const ref = useRef()
  const handleClose = useCallback(() => onClose(), [onClose])
  usePopupClose(ref, handleClose)

  const handleCreatePlant = (plantName) => {
    setPlants(prev => [...prev, plantName])
    setSelectedPlant(plantName)
  }

  return (
    <>
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

            <div className="area-field">
              <div className="area-select">
                <span className="area-select-label">Icono</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

            <PlantDropdown
              plants={plants}
              selected={selectedPlant}
              onSelect={setSelectedPlant}
              onCreateNew={() => setShowCreatePlant(true)}
            />

            <div className="area-section">
              <span className="area-section-label">Etiquetas</span>
              <div className="area-field">
                <button className="area-tag-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
                  </svg>
                  <span>Añadir etiqueta</span>
                </button>
              </div>
            </div>

            <div className="area-upload">
              <div className="area-upload-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <span className="area-upload-label">Añadir imagen</span>
              <span className="area-upload-hint">Suelta su archivo aquí o <span className="area-upload-link">selecciona entre los medios</span></span>
              <span className="area-upload-formats">Admite imágenes JPEG, PNG o GIF.</span>
            </div>

            <div className="area-alias-section">
              <button className="area-alias-header" onClick={() => setAliasOpen(prev => !prev)}>
                <span className="area-alias-title">Alias</span>
                <svg className={`area-alias-chevron ${aliasOpen ? 'open' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {aliasOpen && (
                <div className="area-alias-body">
                  <p className="area-alias-desc">Los alias son nombres alternativos utilizados en los asistentes de voz para referirse a este área.</p>
                  <button className="area-add-alias-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    <span>Añadir alias</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="area-footer">
            <button className="area-cancel-btn" onClick={onClose}>Cancelar</button>
            <button className="area-create-btn" disabled={!name.trim()}>Crear</button>
          </div>
        </div>
      </div>

      {showCreatePlant && (
        <CreatePlantPopup
          onClose={() => setShowCreatePlant(false)}
          onCreate={handleCreatePlant}
        />
      )}
    </>
  )
}
