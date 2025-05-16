"use client";

import React from 'react';
import { Code, Clock, RotateCcw } from 'lucide-react';
import { useApi } from '../../context/ApiContext';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LogsSection() {
  const { 
    activeSession, 
    setActiveSession, 
    sessionLogs, 
    loading, 
    sessions 
  } = useApi();

  const refreshLogs = () => {
    if (activeSession) {
      setActiveSession(activeSession);
    }
  };

  const getLogLevelClass = (level: string) => {
    switch (level.toLowerCase()) {
      case 'info':
        return 'text-blue-400';
      case 'warn':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium flex items-center">
          <Code size={18} className="mr-2 text-rose-600" />
          Logs de Sesión
        </CardTitle>
        
        <div className="flex items-center gap-2">
          <Select
            value={activeSession || "none"}
            onValueChange={(value) => setActiveSession(value === "none" ? null : value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Seleccionar sesión" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Seleccionar sesión</SelectItem>
              {sessions.map(session => (
                <SelectItem key={session.id} value={session.id}>
                  {session.device?.name ?? 'Sin dispositivo'} - {session.flow}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={refreshLogs}
            disabled={!activeSession}
          >
            <RotateCcw size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {!activeSession ? (
          <div className="text-center p-8 text-muted-foreground">
            Selecciona una sesión para ver sus logs
          </div>
        ) : loading.logs ? (
          <div className="text-center p-8">
            <Clock size={24} className="animate-spin mx-auto mb-2 text-rose-600" />
            <p className="text-muted-foreground">Cargando logs...</p>
          </div>
        ) : (
          <div className="bg-black text-white p-4 font-mono text-sm h-96 overflow-y-auto rounded-b-lg">
            {sessionLogs.map((log, index) => (
              <div key={index} className="py-1">
                <span className="text-gray-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                <span className={`ml-2 ${getLogLevelClass(log.level)}`}>
                  {log.level.toUpperCase()}
                </span>
                <span className="ml-2">{log.message}</span>
              </div>
            ))}
            {sessionLogs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No hay logs disponibles
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
