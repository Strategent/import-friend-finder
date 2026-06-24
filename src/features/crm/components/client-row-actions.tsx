import { FileText, Mail, Phone } from "lucide-react";
import { ActionMenu, IconButton } from "@/components/app";

export function ClientRowActions() {
  return (
    <div className="flex items-center justify-end gap-1">
      <IconButton label="Call" icon={Phone} />
      <IconButton label="Email" icon={Mail} />
      <ActionMenu
        actions={[
          { label: "Open profile", icon: FileText },
          { label: "Call", icon: Phone },
          { label: "Email", icon: Mail },
        ]}
      />
    </div>
  );
}
