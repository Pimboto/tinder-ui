"use client";

import React from 'react';
import SessionsList from './SessionsList';
import CheckpointProgress from './CheckpointProgress';
import { useApi } from '../../context/ApiContext';

export default function SessionsSection() {
  const { sessions } = useApi();

  return (
    <div className="space-y-6">
      <SessionsList />
      
      {/* Checkpoint Progress solo se muestra si hay sesiones activas */}
      {sessions.length > 0 && <CheckpointProgress />}
    </div>
  );
}
