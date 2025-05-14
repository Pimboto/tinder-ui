"use client";

import React, { useState, useEffect } from 'react';
import { Play, Clock, AlertCircle, HelpCircle } from 'lucide-react';
import { useApi } from '../../context/ApiContext';
import { CHECKPOINTS, NAME_TYPES, NAME_VARIANTS } from '../../lib/constants';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function StartAutomation() {
  const { 
    selectedDevice, 
    startParams, 
    setStartParams, 
    startAutomation, 
    loading 
  } = useApi();

  const [nameVariants, setNameVariants] = useState<string[]>(NAME_VARIANTS.similar);

  // Actualiza las opciones de variantes de nombre cuando cambia el tipo
  useEffect(() => {
    const variants = NAME_VARIANTS[startParams.profileOptions.nameType as keyof typeof NAME_VARIANTS] || [];
    setNameVariants(variants);
    
    // Si el tipo cambia y la variante actual no está en las nuevas opciones, selecciona la primera
    if (variants.length > 0 && !variants.includes(startParams.profileOptions.nameVariant)) {
      setStartParams({
        ...startParams,
        profileOptions: {
          ...startParams.profileOptions,
          nameVariant: variants[0]
        }
      });
    }
  }, [startParams.profileOptions.nameType]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <Play size={18} className="mr-2 text-rose-600" />
          Iniciar Automatización
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!selectedDevice ? (
          <div className="text-center p-6 border border-dashed border-border rounded-lg">
            <AlertCircle size={32} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">Selecciona un dispositivo para comenzar</p>
          </div>
        ) : (
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="basic">Básico</TabsTrigger>
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="advanced">Avanzado</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="mt-0">
              <ScrollArea className="h-[420px] pr-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="checkpoint">Checkpoint Inicial</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-4 w-4 ml-1">
                              <HelpCircle size={12} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-80">El punto desde donde iniciará la automatización</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select 
                      value={startParams.checkpoint} 
                      onValueChange={(value) => setStartParams({...startParams, checkpoint: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un checkpoint" />
                      </SelectTrigger>
                      <SelectContent>
                        {CHECKPOINTS.map(cp => (
                          <SelectItem key={cp.id} value={cp.id}>{cp.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      {CHECKPOINTS.find(cp => cp.id === startParams.checkpoint)?.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="infinite" className="cursor-pointer">Ejecución Infinita</Label>
                      <Switch 
                        id="infinite"
                        checked={startParams.infinite}
                        onCheckedChange={(checked) => setStartParams({
                          ...startParams, 
                          infinite: checked
                        })}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      La automatización seguirá ejecutándose hasta que se detenga manualmente
                    </p>
                  </div>
                  
                  {startParams.infinite && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="maxRuns">Máximo de Ejecuciones</Label>
                        <Input 
                          id="maxRuns"
                          type="number" 
                          min="1"
                          max="999"
                          value={startParams.maxRuns}
                          onChange={(e) => setStartParams({
                            ...startParams, 
                            maxRuns: parseInt(e.target.value)
                          })}
                        />
                        <p className="text-xs text-muted-foreground">
                          Número máximo de veces que se ejecutará la automatización
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="maxConsecutiveErrors">Máximo de Errores Consecutivos</Label>
                        <Input 
                          id="maxConsecutiveErrors"
                          type="number" 
                          min="1"
                          max="10"
                          value={startParams.maxConsecutiveErrors}
                          onChange={(e) => setStartParams({
                            ...startParams, 
                            maxConsecutiveErrors: parseInt(e.target.value)
                          })}
                        />
                        <p className="text-xs text-muted-foreground">
                          La automatización se detendrá después de este número de errores consecutivos
                        </p>
                      </div>
                    </>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="generateProfile" className="cursor-pointer">Generar Perfil</Label>
                      <Switch 
                        id="generateProfile"
                        checked={startParams.generateProfile}
                        onCheckedChange={(checked) => setStartParams({
                          ...startParams, 
                          generateProfile: checked
                        })}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Genera un perfil automáticamente durante la creación de la cuenta
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="profile" className="mt-0">
              <ScrollArea className="h-[420px] pr-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nameType">Tipo de Nombre</Label>
                    <Select 
                      value={startParams.profileOptions.nameType} 
                      onValueChange={(value) => setStartParams({
                        ...startParams, 
                        profileOptions: {
                          ...startParams.profileOptions, 
                          nameType: value
                        }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo de nombre" />
                      </SelectTrigger>
                      <SelectContent>
                        {NAME_TYPES.map(type => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {startParams.profileOptions.nameType !== 'random' && nameVariants.length > 0 && (
                    <div className="space-y-2">
                      <Label htmlFor="nameVariant">Variante de Nombre</Label>
                      <Select 
                        value={startParams.profileOptions.nameVariant} 
                        onValueChange={(value) => setStartParams({
                          ...startParams, 
                          profileOptions: {
                            ...startParams.profileOptions, 
                            nameVariant: value
                          }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una variante" />
                        </SelectTrigger>
                        <SelectContent>
                          {nameVariants.map(variant => (
                            <SelectItem key={variant} value={variant}>{variant}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="age">Edad</Label>
                    <Input 
                      id="age"
                      type="number" 
                      min="18"
                      max="65"
                      value={startParams.profileOptions.age}
                      onChange={(e) => setStartParams({
                        ...startParams, 
                        profileOptions: {
                          ...startParams.profileOptions, 
                          age: parseInt(e.target.value)
                        }
                      })}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="photoCount">Cantidad de Fotos</Label>
                    <Input 
                      id="photoCount"
                      type="number" 
                      min="1"
                      max="9"
                      value={startParams.params.photoCount}
                      onChange={(e) => setStartParams({
                        ...startParams, 
                        params: {
                          ...startParams.params, 
                          photoCount: parseInt(e.target.value)
                        }
                      })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Número de fotos que se subirán al perfil
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="advanced" className="mt-0">
              <ScrollArea className="h-[420px] pr-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="waitTimeAfterCaptcha">Tiempo de Espera Después de Captcha (ms)</Label>
                    <Input 
                      id="waitTimeAfterCaptcha"
                      type="number" 
                      min="60000"
                      max="300000"
                      step="10000"
                      value={startParams.params.waitTimeAfterCaptcha}
                      onChange={(e) => setStartParams({
                        ...startParams, 
                        params: {
                          ...startParams.params, 
                          waitTimeAfterCaptcha: parseInt(e.target.value)
                        }
                      })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Tiempo de espera en milisegundos después de resolver un captcha
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="totalAccountCreationTime">Tiempo Total Creación de Cuenta (min)</Label>
                    <Input 
                      id="totalAccountCreationTime"
                      type="number" 
                      min="1"
                      max="60"
                      value={startParams.params.totalAccountCreationTime}
                      onChange={(e) => setStartParams({
                        ...startParams, 
                        params: {
                          ...startParams.params, 
                          totalAccountCreationTime: parseInt(e.target.value)
                        }
                      })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Tiempo aproximado en minutos para crear la cuenta completa
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="dragDistanceSlider" className="cursor-pointer">Arrastrar Slider de Distancia</Label>
                      <Switch 
                        id="dragDistanceSlider"
                        checked={startParams.params.dragDistanceSlider}
                        onCheckedChange={(checked) => setStartParams({
                          ...startParams, 
                          params: {
                            ...startParams.params, 
                            dragDistanceSlider: checked
                          }
                        })}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Permite arrastrar el control deslizante de distancia durante la configuración
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <Accordion type="single" collapsible>
                    <AccordionItem value="config">
                      <AccordionTrigger>Ver Configuración JSON</AccordionTrigger>
                      <AccordionContent>
                        <pre className="bg-secondary p-2 rounded-md text-xs overflow-auto max-h-80">
                          {JSON.stringify({
                            udid: selectedDevice,
                            ...startParams
                          }, null, 2)}
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          disabled={!selectedDevice || loading.start}
        >
          Reiniciar valores
        </Button>
        <Button 
          onClick={startAutomation}
          disabled={!selectedDevice || loading.start}
          className="bg-rose-600 hover:bg-rose-700 text-white"
        >
          {loading.start ? (
            <>
              <Clock size={16} className="animate-spin mr-2" />
              Iniciando...
            </>
          ) : (
            <>
              <Play size={16} className="mr-2" />
              Iniciar Automatización
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
