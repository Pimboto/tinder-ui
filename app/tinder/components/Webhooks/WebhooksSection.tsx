"use client";

import React from 'react';
import { Webhook } from 'lucide-react';
import { Card } from "@/components/ui/card";

export default function WebhooksSection() {
  return (
    <Card className="flex flex-col items-center justify-center h-64 text-center p-6">
      <Webhook size={48} className="text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">Gestión de Webhooks</h3>
      <p className="text-muted-foreground mt-2">Esta función estará disponible próximamente</p>
    </Card>
  );
}
