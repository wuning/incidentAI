export type AutomationMode = 'assist' | 'semi' | 'auto';

export interface IncidentData {
  id: string;
  title: string;
  startTime: string;
  impact: string;
  affectedServices: string[];
  businessImpact: string;
  errorRate: number;
  deployTime: string;
  severity: string;
  status: string;
  aiConfidence: number;
  automationMode: AutomationMode;
}

export interface HistoricalIncident {
  id: string;
  title: string;
  solution: string;
  resolutionTime: string;
  timestamp: string;
}

export interface ActionOption {
  title: string;
  description: string;
  estimatedTime: string;
  confidence: string;
  risk: string;
  type: 'primary' | 'secondary';
} 
