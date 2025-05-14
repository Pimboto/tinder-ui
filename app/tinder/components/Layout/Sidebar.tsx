"use client";

import React from 'react';
import { Smartphone, Play, Activity, Server, Webhook, Settings, Flame} from 'lucide-react';
import { useApi } from '../../context/ApiContext';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/mode-toggle";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const SidebarItem = ({ icon, text, active, onClick, disabled }: SidebarItemProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={active ? "secondary" : "ghost"}
      className={`w-full justify-start text-left ${active ? 'font-medium' : ''}`}
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
      {active && <span className="ml-auto">→</span>}
    </Button>
  );
};

export default function Sidebar() {
  const { 
    activeTab, 
    setActiveTab, 
    systemHealth,
    activeSession
  } = useApi();

  return (
    <div className="w-64 bg-card flex flex-col border-r">
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center">
            <span className="bg-rose-600 p-1 rounded-md text-white mr-2 flex items-center justify-center">
            <Flame size={24} />
            </span>
          TinderChop
        </h1>
        <ModeToggle />
      </div>
      
      <Separator />
      
      <nav className="flex-grow mt-4 flex flex-col gap-1 px-2">
        <SidebarItem 
          icon={<Smartphone size={18} />} 
          text="Dispositivos" 
          active={activeTab === 'devices'} 
          onClick={() => setActiveTab('devices')} 
        />
        <SidebarItem 
          icon={<Play size={18} />} 
          text="Automatizaciones" 
          active={activeTab === 'sessions'} 
          onClick={() => setActiveTab('sessions')} 
        />
        <SidebarItem 
          icon={<Activity size={18} />} 
          text="Logs" 
          active={activeTab === 'logs'} 
          onClick={() => setActiveTab('logs')} 
          disabled={!activeSession}
        />
        <SidebarItem 
          icon={<Server size={18} />} 
          text="Servidores Appium" 
          active={activeTab === 'servers'} 
          onClick={() => setActiveTab('servers')} 
        />
        <SidebarItem 
          icon={<Webhook size={18} />} 
          text="Webhooks" 
          active={activeTab === 'webhooks'} 
          onClick={() => setActiveTab('webhooks')} 
        />
        <SidebarItem 
          icon={<Settings size={18} />} 
          text="Configuración" 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')} 
        />
      </nav>
      
      <div className="p-4 border-t">
        <div className="flex items-center text-sm">
          <div className={`mr-2 h-2 w-2 rounded-full ${systemHealth?.status === 'ok' ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className="text-muted-foreground">
            {systemHealth?.status === 'ok' ? 'Conectado' : 'Desconectado'}
          </span>
          <span className="ml-auto text-xs text-muted-foreground">v{systemHealth?.version ?? '1.0.0'}</span>
        </div>
      </div>
    </div>
  );
}
