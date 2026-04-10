import React from 'react'
import { useDevices } from '../../context/DeviceContext'

const LockIcon = ({ locked, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {locked ? (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </>
    ) : (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
      </>
    )}
  </svg>
)

export default function LocksCard() {
  const { devices, toggleLock } = useDevices()

  const allLocked = Object.values(devices.locks).every(l => l.locked)
  const lockedCount = Object.values(devices.locks).filter(l => l.locked).length
  const totalCount = Object.keys(devices.locks).length

  const lockAll = () => {
    Object.keys(devices.locks).forEach(id => {
      if (!devices.locks[id].locked) toggleLock(id)
    })
  }

  const unlockAll = () => {
    Object.keys(devices.locks).forEach(id => {
      if (devices.locks[id].locked) toggleLock(id)
    })
  }

  return (
    <div className="locks-card">
      <div className="card-page-header">Cerraduras</div>
      <div className="locks-summary">
        <div className={`locks-shield ${allLocked ? 'secure' : 'warning'}`}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div className="locks-summary-text">
          <span className="locks-count">{lockedCount}/{totalCount}</span>
          <span className="locks-label">{allLocked ? 'Todo seguro' : 'Cerraduras abiertas'}</span>
        </div>
        <button className="locks-all-btn" onClick={allLocked ? unlockAll : lockAll}>
          {allLocked ? 'Abrir todas' : 'Cerrar todas'}
        </button>
      </div>
      <div className="locks-list">
        {Object.entries(devices.locks).map(([id, lock]) => (
          <div className="lock-row" key={id}>
            <div className="lock-info">
              <span className={`lock-icon ${lock.locked ? 'locked' : 'unlocked'}`}>
                <LockIcon locked={lock.locked} size={18} />
              </span>
              <span className="lock-name">{lock.name}</span>
            </div>
            <button
              className={`toggle-switch-sm ${lock.locked ? 'on' : ''}`}
              onClick={() => toggleLock(id)}
            >
              <span className="toggle-knob-sm" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
