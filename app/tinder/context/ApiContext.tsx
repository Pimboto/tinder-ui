"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { 
  Device, 
  SessionSummary, 
  LogEntry, 
  AppiumServer, 
  SystemHealth, 
  StartParams 
} from '../types/types';
import { api } from '../lib/api';
import { ThemeProvider } from '@/components/ui/theme-provider';

interface ApiContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  systemHealth: SystemHealth | null;
  devices: Device[];
  sessions: SessionSummary[];
  activeSession: string | null;
  setActiveSession: (sessionId: string | null) => void;
  sessionLogs: LogEntry[];
  servers: AppiumServer[];
  loading: Record<string, boolean>;
  selectedDevice: string | null;
  setSelectedDevice: (deviceId: string | null) => void;
  startParams: StartParams;
  setStartParams: (params: StartParams) => void;
  startAutomation: () => Promise<void>;
  stopAutomation: (sessionId: string) => Promise<void>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('devices');
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [sessionLogs, setSessionLogs] = useState<LogEntry[]>([]);
  const [servers, setServers] = useState<AppiumServer[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [startParams, setStartParams] = useState<StartParams>({
    flow: 'tinder',
    checkpoint: 'setProxy',
    generateProfile: true,
    infinite: true,
    maxRuns: 99,
    maxConsecutiveErrors: 2,
    profileOptions: {
      age: 23,
      nameType: 'similar',
      nameVariant: 'Aurabel'
    },
    params: {
      waitTimeAfterCaptcha: 180000,
      photoCount: 6,
      dragDistanceSlider: true,
      totalAccountCreationTime: 1
    }
  });

  // Fetch system health status
  useEffect(() => {
    const fetchHealth = async () => {
      setLoading(prev => ({ ...prev, health: true }));
      const data = await api.get('/health');
      setSystemHealth(data);
      setLoading(prev => ({ ...prev, health: false }));
    };
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fetch devices
  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(prev => ({ ...prev, devices: true }));
      const data = await api.get('/devices');
      if (data.devices) {
        setDevices(data.devices);
      }
      setLoading(prev => ({ ...prev, devices: false }));
    };
    fetchDevices();
    const interval = setInterval(fetchDevices, 10000);
    return () => clearInterval(interval);
  }, []);

  // Fetch active sessions
  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(prev => ({ ...prev, sessions: true }));
      const data = await api.get('/automation');
      if (data.sessions) {
        setSessions(data.sessions);
      }
      setLoading(prev => ({ ...prev, sessions: false }));
    };
    fetchSessions();
    const interval = setInterval(fetchSessions, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Appium servers
  useEffect(() => {
    const fetchServers = async () => {
      setLoading(prev => ({ ...prev, servers: true }));
      const data = await api.get('/appium/servers');
      if (data.servers) {
        setServers(data.servers);
      }
      setLoading(prev => ({ ...prev, servers: false }));
    };
    fetchServers();
    const interval = setInterval(fetchServers, 15000);
    return () => clearInterval(interval);
  }, []);

  // Fetch session logs when activeSession changes
  useEffect(() => {
    if (!activeSession) {
      setSessionLogs([]);
      return;
    }
    
    const fetchSessionLogs = async () => {
      setLoading(prev => ({ ...prev, logs: true }));
      const data = await api.get(`/automation/${activeSession}/logs?limit=50&level=info`);
      if (data.logs) {
        setSessionLogs(data.logs);
      }
      setLoading(prev => ({ ...prev, logs: false }));
    };
    
    fetchSessionLogs();
    const interval = setInterval(fetchSessionLogs, 3000);
    return () => clearInterval(interval);
  }, [activeSession]);

  // Start automation
  const startAutomation = async () => {
    if (!selectedDevice) return;
    
    setLoading(prev => ({ ...prev, start: true }));
    const data = await api.post('/automation/start', {
      udid: selectedDevice,
      flow: startParams.flow,
      checkpoint: startParams.checkpoint,
      generateProfile: startParams.generateProfile,
      infinite: startParams.infinite,
      maxRuns: startParams.maxRuns,
      maxConsecutiveErrors: startParams.maxConsecutiveErrors,
      profileOptions: startParams.profileOptions,
      params: startParams.params
    });
    
    if (data.session) {
      setActiveSession(data.session.id);
      setActiveTab('sessions');
    }
    setLoading(prev => ({ ...prev, start: false }));
  };

  // Stop automation
  const stopAutomation = async (sessionId: string) => {
    setLoading(prev => ({ ...prev, [`stop-${sessionId}`]: true }));
    await api.post(`/automation/${sessionId}/stop`, {});
    setLoading(prev => ({ ...prev, [`stop-${sessionId}`]: false }));
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <ApiContext.Provider value={{
        activeTab,
        setActiveTab,
        systemHealth,
        devices,
        sessions,
        activeSession,
        setActiveSession,
        sessionLogs,
        servers,
        loading,
        selectedDevice,
        setSelectedDevice,
        startParams,
        setStartParams,
        startAutomation,
        stopAutomation
      }}>
        {children}
      </ApiContext.Provider>
    </ThemeProvider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
