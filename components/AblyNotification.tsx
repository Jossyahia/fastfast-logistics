// components/AblyNotification.tsx
"use client";

import React, { useEffect } from "react";
import { configureAbly } from "@/lib/ably";

interface AblyNotificationProps {
  ablyKey: string;
}

const AblyNotification: React.FC<AblyNotificationProps> = ({ ablyKey }) => {
  useEffect(() => {
    const ably = configureAbly(ablyKey);
    const channel = ably.channels.get("bookings");

    const onMessage = (message: any) => {
      console.log("New booking:", message.data);
      // You can update the UI here or show a notification
    };

    channel.subscribe("new-booking", onMessage);

    return () => {
      channel.unsubscribe("new-booking", onMessage);
    };
  }, [ablyKey]);

  return null; // This component doesn't render anything
};

export default AblyNotification;
