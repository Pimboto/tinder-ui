"use client";

import React from 'react';
import Sidebar from './components/Layout/Sidebar';
import MainContent from './components/Layout/MainContent';
import { ApiProvider } from './context/ApiContext';

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
