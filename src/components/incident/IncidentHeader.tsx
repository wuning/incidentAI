import { AlertCircle, BarChart2, Clock, Terminal } from 'lucide-react';
import { AutomationMode, IncidentData } from '@/types/incident';

interface IncidentHeaderProps {
  automationMode: AutomationMode;
  incident: IncidentData;
}

export function IncidentHeader({ automationMode, incident }: IncidentHeaderProps) {
  const getModeStyle = (mode: AutomationMode) => {
    switch (mode) {
      case 'assist':
        return 'bg-blue-100 text-blue-600';
      case 'semi':
        return 'bg-orange-100 text-orange-600';
      case 'auto':
        return 'bg-green-100 text-green-600';
    }
  };

  const getModeText = (mode: AutomationMode) => {
    switch (mode) {
      case 'assist':
        return 'Needs Your Guidance';
      case 'semi':
        return 'Awaiting Approval';
      case 'auto':
        return 'Auto Recovery in Progress';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
      <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-500"></div>
      <div className="p-6">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-900">{incident.title}</h2>
          <div className="ml-3 px-2.5 py-0.5 bg-red-100 text-red-700 text-sm font-medium rounded">
            {incident.id}
          </div>
        </div>

        <div className="mt-4 grid gap-y-3">
          <div className="flex items-center text-gray-600">
            <Clock size={18} className="mr-2 shrink-0" />
            <span className="min-w-[5rem] font-medium">Start Time:</span>
            <span>{incident.startTime}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <AlertCircle size={18} className="mr-2 shrink-0" />
            <span className="min-w-[5rem] font-medium">Impact:</span>
            <span>{incident.impact}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Terminal size={18} className="mr-2 shrink-0" />
            <span className="min-w-[5rem] font-medium">Services:</span>
            <span>{incident.affectedServices.join(', ')}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <BarChart2 size={18} className="mr-2 shrink-0" />
            <span className="min-w-[5rem] font-medium">Business:</span>
            <span>{incident.businessImpact}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-start">
          <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getModeStyle(automationMode)}`}>
            {getModeText(automationMode)}
          </div>
        </div>
      </div>
    </div>
  );
} 