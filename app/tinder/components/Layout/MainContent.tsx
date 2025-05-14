"use client";

import React from 'react';
import { LogOut, Info } from 'lucide-react';
import { useApi } from '../../context/ApiContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Importación de componentes de cada sección
import DevicesSection from '../Devices/DevicesSection';
import SessionsSection from '../Sessions/SessionsSection';
import LogsSection from '../Logs/LogsSection';
import ServersSection from '../Servers/ServersSection';
import WebhooksSection from '../Webhooks/WebhooksSection';
import SettingsSection from '../Settings/SettingsSection';

export default function MainContent() {
  const { activeTab, systemHealth } = useApi();

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      {/* Content Header */}
      <header className="bg-card p-4 flex items-center justify-between border-b">
        <h2 className="text-lg font-semibold text-card-foreground">
          {activeTab === 'devices' && 'Dispositivos iOS'}
          {activeTab === 'sessions' && 'Automatizaciones de Tinder'}
          {activeTab === 'logs' && 'Logs de Sesión'}
          {activeTab === 'servers' && 'Servidores Appium'}
          {activeTab === 'webhooks' && 'Gestión de Webhooks'}
          {activeTab === 'settings' && 'Configuración'}
        </h2>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleString()}
          </span>
          <Button variant="ghost" size="icon">
            <LogOut size={18} className="text-muted-foreground" />
          </Button>
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="p-6">
        {/* System Status */}
        {systemHealth && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Info size={18} className="text-blue-500 mr-2" />
                <h3 className="font-medium">Estado del Sistema</h3>
                <span className="ml-auto flex items-center">
                  <span className={`inline-block h-2 w-2 rounded-full mr-2 ${systemHealth.status === 'ok' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-sm text-muted-foreground">
                    {systemHealth.status === 'ok' ? 'Operativo' : 'Error'} • Actualizado {new Date(systemHealth.timestamp).toLocaleTimeString()}
                  </span>
                </span>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Secciones de contenido */}
        {activeTab === 'devices' && <DevicesSection />}
        {activeTab === 'sessions' && <SessionsSection />}
        {activeTab === 'logs' && <LogsSection />}
        {activeTab === 'servers' && <ServersSection />}
        {activeTab === 'webhooks' && <WebhooksSection />}
        {activeTab === 'settings' && <SettingsSection />}
      </main>
    </div>
  );
}
