import { Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CrmHeaderActions() {
  return (
    <>
      <Button variant="outline" className="border-border bg-transparent">
        <Filter className="mr-2 h-4 w-4" /> Filter
      </Button>
      <Button className="border-0 bg-primary text-primary-foreground hover:bg-primary/90">
        <Plus className="mr-2 h-4 w-4" /> New client
      </Button>
    </>
  );
}
