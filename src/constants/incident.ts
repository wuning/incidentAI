import { IncidentData } from "@/types/incident";

export const TIME_INTERVALS = [
  '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', 
  '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', 
  '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30'
];

export const CHART_COLORS = {
  error: '#e74c3c',
  connection: '#3498db',
  grid: '#f5f5f5',
  reference: '#666',
};

export const CONFIDENCE_LEVELS = {
  assist: 70,
  semi: 85,
  auto: 90,
};

export const DEFAULT_CHART_HEIGHT = 100; 

export const mockIncidents: IncidentData[] = [
  {
    id: 'INC-2043',
    title: 'P1: Payment Processing Service Interruption',
    startTime: '2025-04-03 14:25',
    impact: 'Approximately 35% of payment transactions',
    affectedServices: ['Payment API', 'Settlement System'],
    businessImpact: '$15,000/minute',
    errorRate: 23.7,
    severity: 'critical',
    status: 'active',
    aiConfidence: 85,
    deployTime: '10:30',
    automationMode: 'assist'
  },
  {
    id: 'INC-2042',
    title: 'P2: Database Response Slowdown',
    startTime: '2025-04-03 13:15',
    impact: '20% of query requests',
    affectedServices: ['Database', 'API'],
    businessImpact: '$10,000/minute',
    errorRate: 15.2,
    severity: 'high',
    status: 'resolving',
    aiConfidence: 92,
    deployTime: '10:30',
    automationMode: 'semi'
  },
  {
    id: 'INC-2041',
    title: 'P2: API Timeout Increase',
    startTime: '2025-04-03 10:30',
    impact: '15% of API calls',
    affectedServices: ['API', 'Database'],
    businessImpact: '$5,000/minute',
    errorRate: 8.5,
    severity: 'medium',
    status: 'resolved',
    aiConfidence: 78,
    deployTime: '10:30',
    automationMode: 'auto'
  },
  {
    id: 'INC-2040',
    title: 'Cache Service Anomaly',
    startTime: '2025-04-03 09:15',
    impact: '5% of requests',
    affectedServices: ['Cache Service', 'API'],
    businessImpact: '$2,000/minute',
    errorRate: 4.2,
    severity: 'low',
    status: 'cancelled',
    aiConfidence: 95,
    deployTime: '10:30',
    automationMode: 'assist'
  }
];