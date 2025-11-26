"use client"

import { useEffect } from 'react'
import { MapContainer, ImageOverlay, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Component to update map center
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [center, map])
  return null
}

// Component for animated user location marker
function UserLocationMarker({ position }: { position: [number, number] }) {
  const map = useMap()
  
  useEffect(() => {
    // Create pulsing marker
    const pulsingIcon = L.divIcon({
      className: 'custom-pulsing-marker',
      html: `
        <div style="position: relative; width: 30px; height: 30px;">
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            background: #3b82f6;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
            animation: pulse 2s ease-in-out infinite;
          "></div>
          <style>
            @keyframes pulse {
              0%, 100% {
                box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
              }
              50% {
                box-shadow: 0 0 0 15px rgba(59, 130, 246, 0);
              }
            }
          </style>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    })
    
    const marker = L.marker(position, { icon: pulsingIcon }).addTo(map)
    
    return () => {
      map.removeLayer(marker)
    }
  }, [position, map])
  
  return null
}

interface MapComponentProps {
  userLocation: { lat: number; lng: number }
}

export default function MapComponent({ userLocation }: MapComponentProps) {
  const center: [number, number] = [24.0, 45.0] // Center of Saudi Arabia
  
  // Image bounds for Saudi Arabia map
  const imageBounds: [[number, number], [number, number]] = [
    [16.0, 34.5], // Southwest corner
    [32.5, 56.0]  // Northeast corner
  ]

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '500px' }}>
      <MapContainer
        center={center}
        zoom={6}
        minZoom={5}
        maxZoom={9}
        style={{ width: '100%', height: '100%', minHeight: '500px' }}
        zoomControl={false}
        maxBounds={[[15, 34], [33, 56]]}
        maxBoundsViscosity={1.0}
        attributionControl={false}
      >
        {/* Saudi Arabia map image as background */}
        <ImageOverlay
          url="/saudi-map-final.png"
          bounds={imageBounds}
          opacity={1}
          zIndex={1}
        />
        
        {/* User location marker */}
        <UserLocationMarker position={[userLocation.lat, userLocation.lng]} />
        <ChangeView center={[userLocation.lat, userLocation.lng]} />
      </MapContainer>
    </div>
  )
}
