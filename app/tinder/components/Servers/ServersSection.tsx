"use client";

import React from 'react';
import { Server, Clock } from 'lucide-react';
import { useApi } from '../../context/ApiContext';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ServersSection() {
  const { servers, loading } = useApi();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <Server size={18} className="mr-2 text-rose-600" />
          Servidores Appium
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading.servers ? (
          <div className="text-center p-8">
            <Clock size={24} className="animate-spin mx-auto mb-2 text-rose-600" />
            <p className="text-muted-foreground">Cargando servidores...</p>
          </div>
        ) : (
          <>
            {servers.length === 0 ? (
              <div className="text-center p-8 text-muted-foreground">
                No hay servidores Appium activos
              </div>
            ) : (
              <div>
                {servers.map((server, index) => (
                  <React.Fragment key={server.udid}>
                    {index > 0 && <Separator />}
                    <div className="p-4 hover:bg-secondary/50 transition">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <Server size={24} className="text-blue-500" />
                        </div>
                        <div>
                          <div className="font-medium">Servidor {server.udid.substring(0, 8)}...</div>
                          <div className="text-xs text-muted-foreground">
                            Appium: {server.appiumPort} • WDA: {server.wdaPort} • MJPEG: {server.mjpegPort}
                          </div>
                        </div>
                        <div className="ml-auto">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300">
                            Uptime: {server.uptime}s
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
