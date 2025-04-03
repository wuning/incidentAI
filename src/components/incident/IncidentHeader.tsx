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
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 break-words">{incident.title}</h2>
          <div className="sm:ml-3 px-2.5 py-0.5 bg-red-100 text-red-700 text-sm font-medium rounded w-fit">
            {incident.id}
          </div>
        </div>

        <div className="mt-4 grid gap-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 text-gray-600">
            <div className="flex items-center">
              <Clock size={18} className="mr-2 shrink-0" />
              <span className="min-w-[5rem] font-medium">Start Time:</span>
            </div>
            <span className="sm:ml-2">{incident.startTime}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 text-gray-600">
            <div className="flex items-center">
              <AlertCircle size={18} className="mr-2 shrink-0" />
              <span className="min-w-[5rem] font-medium">Impact:</span>
            </div>
            <span className="sm:ml-2">{incident.impact}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 text-gray-600">
            <div className="flex items-center">
              <Terminal size={18} className="mr-2 shrink-0" />
              <span className="min-w-[5rem] font-medium">Services:</span>
            </div>
            <span className="sm:ml-2 break-words">{incident.affectedServices.join(', ')}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 text-gray-600">
            <div className="flex items-center">
              <BarChart2 size={18} className="mr-2 shrink-0" />
              <span className="min-w-[5rem] font-medium">Business:</span>
            </div>
            <span className="sm:ml-2 break-words">{incident.businessImpact}</span>
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