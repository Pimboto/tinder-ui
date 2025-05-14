"use client";

import React from 'react';
import { Smartphone } from 'lucide-react';
import { useApi } from '../../context/ApiContext';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DevicesList() {
  const { devices, loading, selectedDevice, setSelectedDevice } = useApi();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <Smartphone size={18} className="mr-2 text-rose-600" />
          Dispositivos Disponibles
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading.devices ? (
          <div className="text-center p-4">Cargando dispositivos...</div>
        ) : (
          <div className="space-y-3">
            {devices.map(device => (
              <div 
                key={device.udid} 
                onClick={() => setSelectedDevice(device.udid)}
                className={`p-3 border rounded-lg cursor-pointer transition hover:bg-secondary ${
                  selectedDevice === device.udid ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/20' : 'border-border'
                }`}
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    <Smartphone size={28} className={selectedDevice === device.udid ? 'text-rose-600' : 'text-muted-foreground'} />
                  </div>
                  <div>
                    <div className="font-medium">{device.name}</div>
                    <div className="text-xs text-muted-foreground">iOS {device.version} • {device.udid.substring(0, 8)}...</div>
                  </div>
                  <div className="ml-auto">
                    <Badge variant={device.isAvailable ? "success" : "warning"}>
                      {device.isAvailable ? 'Disponible' : 'En uso'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            {devices.length === 0 && (
              <div className="text-center p-6 text-muted-foreground">
                No hay dispositivos disponibles
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
