"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import type { LatLngLiteral, LeafletMouseEvent, Marker as LeafletMarkerType } from "leaflet"
import { useMapEvents, Marker as LeafletMarker, useMap } from "react-leaflet"

// ✅ Dynamically import React-Leaflet components (client-side only)
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false })

interface MapProps {
  lat: number
  lng: number
  setCoordinates: (pos: LatLngLiteral) => void
}

// 🧭 Helper component to recenter map when coordinates change
function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()
  useEffect(() => {
    map.setView([lat, lng])
  }, [lat, lng, map])
  return null
}

// 📍 Click + Drag marker handler
function LocationMarker({ setCoordinates }: { setCoordinates: (pos: LatLngLiteral) => void }) {
  const [position, setPosition] = useState<LatLngLiteral | null>(null)

  useMapEvents({
    click(e: LeafletMouseEvent) {
      const pos = e.latlng
      setPosition(pos)
      setCoordinates(pos)
    },
  })

  if (!position) return null

  return (
    <Marker
      position={position}
      draggable
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target as LeafletMarkerType
          const newPos = marker.getLatLng()
          setPosition(newPos)
          setCoordinates(newPos)
        },
      }}
    />
  )
}

export default function EmergencyMap({ lat, lng, setCoordinates }: MapProps) {
  return (
    <div className="rounded-lg overflow-hidden border border-red-200" style={{ height: "300px" }}>
      <MapContainer
        center={[lat, lng]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterMap lat={lat} lng={lng} />
        <LocationMarker setCoordinates={setCoordinates} />
      </MapContainer>
    </div>
  )
}
