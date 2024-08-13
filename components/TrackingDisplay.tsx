"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function TrackingDisplay() {
  const [trackingId, setTrackingId] = useState('')
  const [trackingInfo, setTrackingInfo] = useState<null | { status: string, location: string }>(null)

  const handleTracking = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement tracking logic
    setTrackingInfo({ status: 'In Transit', location: 'Distribution Center' })
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleTracking} className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          required
        />
        <Button type="submit">Track</Button>
      </form>
      {trackingInfo && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold">Tracking Information</h3>
          <p>Status: {trackingInfo.status}</p>
          <p>Location: {trackingInfo.location}</p>
        </div>
      )}
    </div>
  )
}