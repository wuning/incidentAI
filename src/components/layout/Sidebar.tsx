import { 
  Settings,
  LayoutDashboard,
  AlertTriangle,
  Gauge,
  Wrench,
  Sparkles,
  Network,
  Sliders,
  FileCode,
  type LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavItemProps {
  icon: LucideIcon
  label: string
  active?: boolean
}

function NavItem({ icon: Icon, label, active }: NavItemProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${active ? "bg-blue-100 text-blue-900" : "text-gray-700 hover:bg-gray-100"}`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </div>
  )
}

export function Sidebar() {
  return (
    <div className="w-56 bg-gray-50 border-r border-gray-100 flex flex-col">
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        <div className="font-semibold">Incident Response System</div>
        <Button variant="default" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </div>

      <div className="flex-1 py-2 px-2">
        <div className="space-y-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={AlertTriangle} label="Alerts" />
          <NavItem icon={Gauge} label="Analysis" />
          <NavItem icon={Wrench} label="Execute" />
          <NavItem icon={Sparkles} label="Learn" />
        </div>

        <div className="mt-6">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500">Tools</div>
          <div className="space-y-1 mt-1">
            <NavItem icon={Network} label="Topology View" />
            <NavItem icon={Sliders} label="Metrics" />
            <NavItem icon={FileCode} label="Knowledge Base" />
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100 flex items-center">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src="/placeholder.svg" alt="Engineer" />
          <AvatarFallback>Eng</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium">Engineer</div>
          <div className="text-xs text-gray-500">Senior SRE</div>
        </div>
      </div>
    </div>
  );
} 