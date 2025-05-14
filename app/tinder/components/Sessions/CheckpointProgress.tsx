"use client";

import React from 'react';
import { Activity, Check } from 'lucide-react';
import { useApi } from '../../context/ApiContext';
import { CHECKPOINTS } from '../../lib/constants';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function CheckpointProgress() {
  const { sessions } = useApi();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <Activity size={18} className="mr-2 text-rose-600" />
          Progreso de Checkpoints
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sessions.map(session => {
            const currentIndex = CHECKPOINTS.findIndex(cp => cp.id === session.checkpoint);
            const progressPercentage = ((currentIndex + 1) / CHECKPOINTS.length) * 100;
            
            return (
              <div key={`progress-${session.id}`} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{session.device?.name ?? 'Dispositivo desconocido'}</span>
                  <span className="text-muted-foreground">
                    {currentIndex + 1} / {CHECKPOINTS.length}
                  </span>
                </div>
                
                <Progress value={progressPercentage} className="h-2" />
                
                <div className="grid grid-cols-5 gap-1 text-xs">
                  <TooltipProvider>
                    {CHECKPOINTS.map((cp, index) => {
                      const isCurrentCheckpoint = cp.id === session.checkpoint;
                      const isCompletedCheckpoint = index < currentIndex;
                      
                      return (
                        <Tooltip key={cp.id}>
                          <TooltipTrigger asChild>
                            <div 
                              className={`text-center py-1 px-1 rounded cursor-help ${
                                isCurrentCheckpoint ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/30 dark:text-rose-300 font-medium' :
                                isCompletedCheckpoint ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                              }`}
                            >
                              {isCompletedCheckpoint && <Check size={12} className="inline" />}
                              {isCurrentCheckpoint && '•'}
                              {cp.label.substring(0, 6)}...
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{cp.label}: {cp.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </TooltipProvider>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
