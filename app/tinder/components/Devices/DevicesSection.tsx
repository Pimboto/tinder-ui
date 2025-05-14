"use client";

import React from 'react';
import DevicesList from './DevicesList';
import StartAutomation from './StartAutomation';

export default function DevicesSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DevicesList />
      <StartAutomation />
    </div>
  );
}
