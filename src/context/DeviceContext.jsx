import React, { createContext, useContext, useState } from 'react'

const DeviceContext = createContext()

const initialDevices = {
  lights: {
    'entrada':    { name: 'Entrada', on: false, brightness: 75 },
    'hall':       { name: 'Hall', on: false, brightness: 75 },
    'wc':         { name: 'WC', on: false, brightness: 75 },
    'cocina':     { name: 'Cocina', on: false, brightness: 75 },
    'comedor':    { name: 'Comedor', on: false, brightness: 75 },
    'alcoba-1':   { name: 'Alcoba 1', on: false, brightness: 75 },
    'alcoba-2':   { name: 'Alcoba 2', on: false, brightness: 75 },
    'alcoba-3':   { name: 'Alcoba 3', on: false, brightness: 75 },
    'tv':         { name: 'Tv', on: false, brightness: 75 },
  },
  thermostats: {
    'alcoba-1':  { name: 'Alcoba 1', currentTemp: 20, targetTemp: 24, mode: 'inactive' },
    'alcoba-2':  { name: 'Alcoba 2', currentTemp: 20, targetTemp: 24, mode: 'inactive' },
    'alcoba-3':  { name: 'Alcoba 3', currentTemp: 20, targetTemp: 24, mode: 'inactive' },
    'sala':      { name: 'Sala', currentTemp: 20, targetTemp: 24, mode: 'inactive' },
    'tv':        { name: 'Tv', currentTemp: 20, targetTemp: 24, mode: 'inactive' },
  },
  curtains: {
    'alcoba-2':  { name: 'Alcoba 2', position: 100 },
    'alcoba-1':  { name: 'Alcoba 1', position: 100 },
    'alcoba-3':  { name: 'Alcoba 3', position: 100 },
    'tv':        { name: 'TV', position: 100 },
    'sala':      { name: 'Sala', position: 100 },
  },
  cameras: {
    'door':    { name: 'Door camera', active: true },
    'hall':    { name: 'Hall camera', active: true },
    'cocina':  { name: 'Cocina camera', active: true },
    'tv':      { name: 'Tv camera', active: true },
    'sala':    { name: 'Sala camera', active: true },
  },
  tv: {
    activity: 'YouTube',
    hdmiSwitcher: 'Shield',
    hdmiInput: 'InputHdmi4',
    volume: 18,
    totalTime: 0.42,
    on: true,
  },
  energy: {
    solar:   { value: 5.25, unit: 'kWh' },
    gas:     { value: 0, unit: 'm³' },
    gridIn:  { value: 0.97, unit: 'kWh' },
    gridOut: { value: 5.28, unit: 'kWh' },
    batteryIn:  { value: 0, unit: 'kWh' },
    batteryOut: { value: 0, unit: 'kWh' },
    water:   { value: 0, unit: 'L' },
    house:   { value: 9.56, unit: 'kWh' },
  },
  nowPlaying: {
    room: 'Salón',
    title: 'I Wasn\'t Born To Follow',
    artist: 'The Byrds',
    album: 'Easy Rider (Soundtrack)',
    isPlaying: true,
  },
  energyHourly: {
    sources: [
      { hour: 0, solar: 0, grid: 18 }, { hour: 1, solar: 0, grid: 16 },
      { hour: 2, solar: 0, grid: 15 }, { hour: 3, solar: 0, grid: 14 },
      { hour: 4, solar: 0, grid: 12 }, { hour: 5, solar: 0, grid: 13 },
      { hour: 6, solar: 1, grid: 14 }, { hour: 7, solar: 4, grid: 16 },
      { hour: 8, solar: 8, grid: 14 }, { hour: 9, solar: 14, grid: 10 },
      { hour: 10, solar: 18, grid: 7 }, { hour: 11, solar: 22, grid: 5 },
      { hour: 12, solar: 24, grid: 4 }, { hour: 13, solar: 22, grid: 5 },
      { hour: 14, solar: 20, grid: 6 }, { hour: 15, solar: 16, grid: 8 },
      { hour: 16, solar: 10, grid: 10 }, { hour: 17, solar: 5, grid: 14 },
      { hour: 18, solar: 2, grid: 16 }, { hour: 19, solar: 0, grid: 18 },
      { hour: 20, solar: 0, grid: 20 }, { hour: 21, solar: 0, grid: 19 },
      { hour: 22, solar: 0, grid: 17 }, { hour: 23, solar: 0, grid: 15 },
    ],
    electricity: [
      { hour: 0, grid: 0.5, solar: 0, export: 0 },
      { hour: 1, grid: 0.3, solar: 0, export: 0 },
      { hour: 2, grid: 0.2, solar: 0, export: 0 },
      { hour: 3, grid: 0.15, solar: 0, export: 0 },
      { hour: 4, grid: 0.1, solar: 0, export: 0 },
      { hour: 5, grid: 0.2, solar: 0, export: 0 },
      { hour: 6, grid: 0.3, solar: 0.05, export: 0 },
      { hour: 7, grid: 0.4, solar: 0.1, export: 0 },
      { hour: 8, grid: 0.3, solar: 0.2, export: 0 },
      { hour: 9, grid: 0.2, solar: 0.4, export: 0 },
      { hour: 10, grid: 0.1, solar: 0.8, export: -0.2 },
      { hour: 11, grid: 0.05, solar: 1.0, export: -0.4 },
      { hour: 12, grid: 0, solar: 1.2, export: -0.6 },
      { hour: 13, grid: 0, solar: 1.3, export: -0.7 },
      { hour: 14, grid: 0, solar: 1.2, export: -0.5 },
      { hour: 15, grid: 0.1, solar: 1.0, export: -0.3 },
      { hour: 16, grid: 0.2, solar: 0.6, export: -0.1 },
      { hour: 17, grid: 0.3, solar: 0.3, export: 0 },
      { hour: 18, grid: 0.5, solar: 0.1, export: 0 },
      { hour: 19, grid: 0.6, solar: 0, export: 0 },
      { hour: 20, grid: 0.8, solar: 0, export: 0 },
      { hour: 21, grid: 1.0, solar: 0, export: 0 },
      { hour: 22, grid: 0.7, solar: 0, export: 0 },
      { hour: 23, grid: 0.5, solar: 0, export: 0 },
    ],
  },
  vacuum: {
    name: 'Aspiradora',
    running: false,
    mode: 'auto',
    battery: 78,
    area: 'Sala',
  },
  locks: {
    'puerta-principal': { name: 'Puerta Principal', locked: true },
    'puerta-garaje':    { name: 'Puerta Garaje', locked: true },
    'puerta-cocina':    { name: 'Puerta Cocina', locked: false },
    'alcoba-1':         { name: 'Alcoba 1', locked: true },
    'alcoba-2':         { name: 'Alcoba 2', locked: true },
    'alcoba-3':         { name: 'Alcoba 3', locked: false },
  },
  iotDevices: {
    'smart-plug-1':   { name: 'Enchufe Cocina', type: 'plug', on: true },
    'smart-plug-2':   { name: 'Enchufe Sala', type: 'plug', on: false },
    'air-purifier':   { name: 'Purificador', type: 'purifier', on: true },
    'humidifier':     { name: 'Humidificador', type: 'humidifier', on: false },
    'smart-speaker':  { name: 'Altavoz Hall', type: 'speaker', on: true },
    'door-lock':      { name: 'Cerradura Puerta', type: 'lock', locked: true },
  },
  energyHistory: [
    { month: 'mar-25', value: 138 },
    { month: 'abr-25', value: 155 },
    { month: 'may-25', value: 160 },
    { month: 'jun-25', value: 145 },
    { month: 'jul-25', value: 178 },
    { month: 'ago-25', value: 170 },
    { month: 'sep-25', value: 173 },
  ],
}

export function DeviceProvider({ children }) {
  const [devices, setDevices] = useState(initialDevices)

  const toggleLight = (roomId) => {
    setDevices(prev => ({
      ...prev,
      lights: {
        ...prev.lights,
        [roomId]: { ...prev.lights[roomId], on: !prev.lights[roomId].on }
      }
    }))
  }

  const setLightBrightness = (roomId, brightness) => {
    setDevices(prev => ({
      ...prev,
      lights: {
        ...prev.lights,
        [roomId]: { ...prev.lights[roomId], brightness }
      }
    }))
  }

  const setTemperature = (roomId, temperature) => {
    setDevices(prev => ({
      ...prev,
      thermostats: {
        ...prev.thermostats,
        [roomId]: { ...prev.thermostats[roomId], targetTemp: Math.max(16, Math.min(30, temperature)) }
      }
    }))
  }

  const setCurtainPosition = (roomId, position) => {
    setDevices(prev => ({
      ...prev,
      curtains: {
        ...prev.curtains,
        [roomId]: { ...prev.curtains[roomId], position: Math.max(0, Math.min(100, position)) }
      }
    }))
  }

  const toggleCamera = (cameraId) => {
    setDevices(prev => ({
      ...prev,
      cameras: {
        ...prev.cameras,
        [cameraId]: { ...prev.cameras[cameraId], active: !prev.cameras[cameraId].active }
      }
    }))
  }

  const setTvProperty = (key, value) => {
    setDevices(prev => ({
      ...prev,
      tv: { ...prev.tv, [key]: value }
    }))
  }

  const togglePlayback = () => {
    setDevices(prev => ({
      ...prev,
      nowPlaying: { ...prev.nowPlaying, isPlaying: !prev.nowPlaying.isPlaying }
    }))
  }

  const toggleVacuum = () => {
    setDevices(prev => ({
      ...prev,
      vacuum: { ...prev.vacuum, running: !prev.vacuum.running }
    }))
  }

  const setVacuumMode = (mode) => {
    setDevices(prev => ({
      ...prev,
      vacuum: { ...prev.vacuum, mode }
    }))
  }

  const toggleLock = (lockId) => {
    setDevices(prev => ({
      ...prev,
      locks: {
        ...prev.locks,
        [lockId]: { ...prev.locks[lockId], locked: !prev.locks[lockId].locked }
      }
    }))
  }

  const toggleIoTDevice = (deviceId) => {
    setDevices(prev => {
      const device = prev.iotDevices[deviceId]
      const key = device.type === 'lock' ? 'locked' : 'on'
      return {
        ...prev,
        iotDevices: {
          ...prev.iotDevices,
          [deviceId]: { ...device, [key]: !device[key] }
        }
      }
    })
  }

  const turnOffTv = () => {
    setDevices(prev => ({
      ...prev,
      tv: { ...prev.tv, on: false }
    }))
  }

  return (
    <DeviceContext.Provider value={{
      devices,
      toggleLight,
      setLightBrightness,
      setTemperature,
      setCurtainPosition,
      toggleCamera,
      setTvProperty,
      turnOffTv,
      togglePlayback,
      toggleVacuum,
      setVacuumMode,
      toggleIoTDevice,
      toggleLock,
    }}>
      {children}
    </DeviceContext.Provider>
  )
}

export const useDevices = () => useContext(DeviceContext)
