import React, { useState } from 'react'
import { DeviceProvider } from './context/DeviceContext'
import Sidebar from './components/Sidebar'
import DashboardGrid from './components/DashboardGrid'
import EnergyView from './components/EnergyView'
import MapView from './components/MapView'
import ConnectionsView from './components/ConnectionsView'
import AddMenu from './components/AddMenu'
import './styles/App.css'

const VIEWS = {
  home: 'Home',
  energy: 'Energía',
  map: 'Mapa',
  connections: 'Conexiones',
  updates: 'Actualizaciones',
  history: 'Historial',
}

function PlaceholderView({ name }) {
  return (
    <div className="placeholder-view">
      <div className="placeholder-icon">
        {name === 'Energía' && '⚡'}
        {name === 'Mapa' && '🗺'}
        {name === 'Conexiones' && '🔗'}
        {name === 'Actualizaciones' && '🔄'}
        {name === 'Historial' && '📋'}
      </div>
      <h2>{name}</h2>
      <p>Vista en desarrollo</p>
    </div>
  )
}

export default function App() {
  const [activeView, setActiveView] = useState('home')

  return (
    <DeviceProvider>
      <div className="app">
        <Sidebar activeView={activeView} onViewChange={setActiveView} views={VIEWS} />
        <main className="main-content">
          <header className="main-header">
            <div className="main-header-info">
              <h1 className="main-header-title">Casa A</h1>
              <div className="main-header-status">
                <span className="status-dot-green" />
                <span className="status-text-connected">Conectado</span>
              </div>
            </div>
            <AddMenu />
          </header>
          <div className="main-body">
            {activeView === 'home' && <DashboardGrid />}
            {activeView === 'energy' && <EnergyView />}
            {activeView === 'map' && <MapView />}
            {activeView === 'connections' && <ConnectionsView />}
            {activeView === 'updates' && <PlaceholderView name="Actualizaciones" />}
            {activeView === 'history' && <PlaceholderView name="Historial" />}
          </div>
        </main>
      </div>
    </DeviceProvider>
  )
}
