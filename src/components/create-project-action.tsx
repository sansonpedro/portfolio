"use client";

import { PlusIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function CreateProjectAction() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Meus Projetos</h2>
        <p className="text-muted-foreground text-sm">
          Gerencie e visualize seus projetos recentes.
        </p>
      </div>
      <Button className="gap-2">
        <PlusIcon className="h-4 w-4" />
        Novo Projeto
      </Button>
    </div>
  );
}
