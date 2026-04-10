import React from 'react'
import ControlsCard from './cards/ControlsCard'
import HouseCard from './cards/HouseCard'
import MediaCard from './cards/MediaCard'
import EnergyCard from './cards/EnergyCard'
import IoTCard from './cards/IoTCard'
import LocksCard from './cards/LocksCard'
import '../styles/DashboardGrid.css'
import '../styles/Cards.css'

export default function DashboardGrid() {
  return (
    <div className="dashboard-grid">
      <div className="grid-left">
        <div className="grid-card grid-card-house">
          <HouseCard />
        </div>
      </div>
      <div className="grid-right">
        <div className="grid-card grid-card-device">
          <ControlsCard />
        </div>
        <div className="grid-card grid-card-device">
          <MediaCard />
        </div>
        <div className="grid-card grid-card-device">
          <EnergyCard />
        </div>
        <div className="grid-card grid-card-device">
          <IoTCard />
        </div>
        <div className="grid-card grid-card-device">
          <LocksCard />
        </div>
      </div>
    </div>
  )
}
