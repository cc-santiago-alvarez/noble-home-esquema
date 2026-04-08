import React from 'react'
import ControlsCard from './cards/ControlsCard'
import HouseCard from './cards/HouseCard'
import MediaCard from './cards/MediaCard'
import EnergyCard from './cards/EnergyCard'
import '../styles/DashboardGrid.css'
import '../styles/Cards.css'

export default function DashboardGrid() {
  return (
    <div className="dashboard-grid">
      <div className="grid-card grid-top-left">
        <ControlsCard />
      </div>
      <div className="grid-card grid-top-right">
        <HouseCard />
      </div>
      <div className="grid-card grid-bottom-left">
        <MediaCard />
      </div>
      <div className="grid-card grid-bottom-right">
        <EnergyCard />
      </div>
    </div>
  )
}
