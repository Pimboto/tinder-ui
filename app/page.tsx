"use client";

import React from 'react';
import Sidebar from './tinder/components/Layout/Sidebar';
import MainContent from './tinder/components/Layout/MainContent';
import { ApiProvider } from './tinder/context/ApiContext';

export default function TinderAutomationApp() {
  return (
    <ApiProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <MainContent />
      </div>
    </ApiProvider>
  );
}
