"use client"

import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Code,
  Database,
  Eye,
  type LucideIcon
} from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { Layout } from "@/components/layout/Layout"
import { useNavigate } from "react-router-dom"
import { mockIncidents } from "@/constants/incident"
import { IncidentData, AutomationMode } from "@/types/incident"
const performanceData = [
  { name: "Auth", value: 95 },
  { name: "Payment", value: 97 },
  { name: "Search", value: 98 },
  { name: "Database", value: 94 },
  { name: "Storage", value: 96 },
  { name: "API", value: 97 },
]

export default function ListPage() {
  return (
    <Layout>
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">System Overview</h1>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
            <MetricCard
              icon={AlertTriangle}
              title="Active Alerts"
              value="3"
              description="1 P1, 2 P2 alerts requiring attention"
              actionLabel="View Alerts"
              iconColor="text-red-500"
            />
            <MetricCard
              icon={CheckCircle}
              title="System Health"
              value="97.8%"
              description="Overall system availability in the last 24h"
              actionLabel="View Details"
            />
            <MetricCard
              icon={Clock}
              title="MTTR"
              value="14.2 min"
              description="Average resolution time this week"
              actionLabel="View Trends"
            />
          </div>

          {/* Recent Incidents */}
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Recent Incidents</h2>
          <div className="bg-white rounded-lg mb-6 sm:mb-8">
            <Incident
              icon={Clock}
              title="P1: Payment Processing Service Disruption"
              service="Payment Service"
              time="15 min ago"
              status="Need Guidance"
              incident={mockIncidents[0]}
            />
            <Incident
              icon={AlertTriangle}
              title="P2: Database Response Slowdown"
              service="Database Service"
              time="2h ago"
              status="Awaiting Approval"
              iconColor="text-orange-500"
              incident={mockIncidents[1]}
            />
            <Incident
              icon={AlertTriangle}
              title="P2: API Timeout Increase"
              service="API Service"
              time="Yesterday"
              status="Auto Recovery"
              iconColor="text-orange-500"
              incident={mockIncidents[2]}
            />
          </div>

          {/* System Performance */}
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">System Performance</h2>
          <div className="bg-white rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Bar dataKey="value" fill="#000" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* AI Insights */}
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">AI Insights</h2>
          <div className="bg-white rounded-lg mb-6 sm:mb-8">
            <Insight
              icon={Database}
              title="Database Connection Pool"
              description="Potential configuration issue detected"
            />
            <Insight 
              icon={Code} 
              title="API Rate Limiting" 
              description="Recommend increasing threshold by 15%" 
            />
            <Insight
              icon={Database}
              title="Memory Optimization"
              description="3 services could benefit from config changes"
            />
          </div>

          {/* Recent Deployments */}
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Recent Deployments</h2>
          <div className="bg-white rounded-lg">
            <Deployment
              icon={Code}
              service="Payment Service"
              version="v2.4.1"
              time="Today, 09:15"
              status="Successful"
              statusDetail="No issues detected"
            />
            <Deployment
              icon={Code}
              service="Auth Service"
              version="v1.8.0"
              time="Yesterday, 14:30"
              status="Successful"
              statusDetail="Minor latency increase"
            />
            <Deployment
              icon={Code}
              service="Search API"
              version="v3.2.5"
              time="2 days ago"
              status="Successful"
              statusDetail="No issues detected"
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

interface MetricCardProps {
  icon: LucideIcon
  title: string
  value: string
  description: string
  actionLabel: string
  iconColor?: string
}

function MetricCard({
  icon: Icon,
  title,
  value,
  description,
  actionLabel,
  iconColor = "text-blue-500",
}: MetricCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 flex flex-col">
      <div className={`${iconColor} mb-2`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="uppercase text-xs font-medium text-gray-600 mb-1">{title}</div>
      <div className="text-xl sm:text-2xl font-semibold mb-1">{value}</div>
      <div className="text-xs text-gray-500 mb-3 sm:mb-4">{description}</div>
      <Button variant="default" size="sm" className="mt-auto self-start">
        {actionLabel}
      </Button>
    </div>
  )
}

interface IncidentProps {
  icon: LucideIcon
  title: string
  service: string
  time: string
  status: string
  iconColor?: string
  incident: IncidentData
}

function Incident({ icon: Icon, title, service, time, status, iconColor = "text-yellow-500", incident }: IncidentProps) {
  const navigate = useNavigate();
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

  return (
    <div 
      className="border-b border-gray-100 last:border-0 p-3 sm:p-4 hover:bg-gray-50 cursor-pointer"
      onClick={() => navigate(`/incident/${incident.id}`)}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className={iconColor}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="font-medium text-sm sm:text-base">{title}</div>
            <div className="text-gray-500 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span>{service}</span>
              <span className="hidden sm:inline">•</span>
              <span>{time}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-8 sm:ml-0">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getModeStyle(incident.automationMode)}`}>
            {status}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4 text-gray-500" />
            <span className="sr-only">View details</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

interface InsightProps {
  icon: LucideIcon
  title: string
  description: string
}

function Insight({ icon: Icon, title, description }: InsightProps) {
  return (
    <div className="border-b border-gray-100 last:border-0 p-3 sm:p-4 hover:bg-gray-50">
      <div className="flex items-start gap-3">
        <div className="text-blue-500">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="font-medium text-sm sm:text-base">{title}</div>
          <div className="text-gray-500 text-xs sm:text-sm mt-1">{description}</div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto">
          <Eye className="h-4 w-4 text-gray-500" />
          <span className="sr-only">View</span>
        </Button>
      </div>
    </div>
  )
}

interface DeploymentProps {
  icon: LucideIcon
  service: string
  version: string
  time: string
  status: string
  statusDetail: string
}

function Deployment({ icon: Icon, service, version, time, status, statusDetail }: DeploymentProps) {
  return (
    <div className="border-b border-gray-100 last:border-0 p-3 sm:p-4 hover:bg-gray-50">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="text-gray-400">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="font-medium text-sm sm:text-base">{service}</div>
            <div className="text-gray-500 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span>{version}</span>
              <span className="hidden sm:inline">•</span>
              <span>{time}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-8 sm:ml-0">
          <div className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-medium">
            {status}
          </div>
          <div className="text-gray-500 text-xs hidden sm:block">{statusDetail}</div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4 text-gray-500" />
            <span className="sr-only">View</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

