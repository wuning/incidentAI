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
  X,
  type LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavItemProps {
  icon: LucideIcon
  label: string
  active?: boolean
  onClick?: () => void
}

interface SidebarProps {
  onClose?: () => void
}

function NavItem({ icon: Icon, label, active, onClick }: NavItemProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer
        ${active ? "bg-blue-100 text-blue-900" : "text-gray-700 hover:bg-gray-100"}`}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </div>
  )
}

export function Sidebar({ onClose }: SidebarProps) {
  return (
    <div className="w-[280px] lg:w-56 bg-gray-50 border-r border-gray-100 flex flex-col h-full relative">
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        <div className="font-semibold">Incident Response System</div>
        <div className="flex gap-2">
          <Button variant="default" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4 text-gray-500" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 lg:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4 text-gray-500" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 py-2 px-2 overflow-y-auto">
        <div className="space-y-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" active onClick={onClose} />
          <NavItem icon={AlertTriangle} label="Alerts" onClick={onClose} />
          <NavItem icon={Gauge} label="Analysis" onClick={onClose} />
          <NavItem icon={Wrench} label="Execute" onClick={onClose} />
          <NavItem icon={Sparkles} label="Learn" onClick={onClose} />
        </div>

        <div className="mt-6">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500">Tools</div>
          <div className="space-y-1 mt-1">
            <NavItem icon={Network} label="Topology View" onClick={onClose} />
            <NavItem icon={Sliders} label="Metrics" onClick={onClose} />
            <NavItem icon={FileCode} label="Knowledge Base" onClick={onClose} />
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