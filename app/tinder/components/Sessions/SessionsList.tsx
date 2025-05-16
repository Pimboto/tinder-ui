"use client";

import React from 'react';
import { Play, Clock, X, Eye, PauseCircle, PlayCircle } from 'lucide-react';
import { useApi } from '../../context/ApiContext';
import { CHECKPOINTS } from '../../lib/constants';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function SessionsList() {
  const { sessions, loading, setActiveSession, stopAutomation, setActiveTab } = useApi();

  const handleViewLogs = (sessionId: string) => {
    setActiveSession(sessionId);
    setActiveTab('logs');
  };

  /* const handleResume = (sessionId: string) => {
    // Esta funcionalidad estará disponible próximamente
    alert("Próximamente: Funcionalidad para resumir sesiones");
  };

  const handlePause = (sessionId: string) => {
    // Esta funcionalidad estará disponible próximamente
    alert("Próximamente: Funcionalidad para pausar sesiones");
  }; */

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return <Badge variant="success">Activo</Badge>;
      case 'paused':
        return <Badge variant="warning">Pausado</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Desconocido</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <Play size={18} className="mr-2 text-rose-600" />
          Sesiones Activas
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading.sessions ? (
          <div className="text-center p-8">
            <Clock size={24} className="animate-spin mx-auto mb-2 text-rose-600" />
            <p className="text-muted-foreground">Cargando sesiones...</p>
          </div>
        ) : (
          <>
            {sessions.length === 0 ? (
              <div className="text-center p-8 text-muted-foreground">
                No hay sesiones activas
              </div>
            ) : (
              <div>
                {sessions.map((session, index) => (
                  <React.Fragment key={session.id}>
                    {index > 0 && <Separator />}
                    <div className="p-4 hover:bg-secondary/50 transition">
                      <div className="flex flex-col">
                        <div className="flex items-center mb-2">
                          <div className="mr-3">
                            {getStatusBadge(session.status)}
                          </div>
                          <div>
                            <div className="font-medium">{session.device.name}</div>
                            <div className="text-xs text-muted-foreground">
                              Flujo: {session.flow} • Checkpoint: {
                                CHECKPOINTS.find(cp => cp.id === session.checkpoint)?.label || session.checkpoint
                              }
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-auto">
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewLogs(session.id)}
                            title="Ver logs"
                          >
                            <Eye size={16} className="mr-1" />
                            Logs
                          </Button>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={true}
                                    className="relative"
                                  >
                                    {session.status === 'paused' ? (
                                      <>
                                        <PlayCircle size={16} className="mr-1" />
                                        Resumir
                                      </>
                                    ) : (
                                      <>
                                        <PauseCircle size={16} className="mr-1" />
                                        Pausar
                                      </>
                                    )}
                                    <Badge className="absolute -top-2 -right-2 h-4 text-[10px] px-1 py-0 bg-amber-500">BETA</Badge>
                                  </Button>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Esta función estará disponible próximamente</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => stopAutomation(session.id)}
                            disabled={loading[`stop-${session.id}`]}
                            title="Detener"
                          >
                            {loading[`stop-${session.id}`] ? (
                              <Clock size={16} className="animate-spin" />
                            ) : (
                              <>
                                <X size={16} className="mr-1" />
                                Detener
                              </>
                            )}
                          </Button>
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
