"use client"

import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Code,
  Database,
  Eye,
  MoreVertical,
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
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-6">System Overview</h1>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
          <h2 className="text-xl font-semibold mb-4">Recent Incidents</h2>
          <div className="bg-white rounded-lg mb-8">
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
          <h2 className="text-xl font-semibold mb-4">System Performance</h2>
          <div className="bg-white rounded-lg p-4 mb-8 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Bar dataKey="value" fill="#000" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* AI Insights */}
          <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
          <div className="bg-white rounded-lg mb-8">
            <Insight
              icon={Database}
              title="Database Connection Pool"
              description="Potential configuration issue detected"
            />
            <Insight icon={Code} title="API Rate Limiting" description="Recommend increasing threshold by 15%" />
            <Insight
              icon={Database}
              title="Memory Optimization"
              description="3 services could benefit from config changes"
            />
          </div>

          {/* Recent Deployments */}
          <h2 className="text-xl font-semibold mb-4">Recent Deployments</h2>
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
    <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
      <div className={`${iconColor} mb-2`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="uppercase text-xs font-medium text-gray-600 mb-1">{title}</div>
      <div className="text-2xl font-semibold mb-1">{value}</div>
      <div className="text-xs text-gray-500 mb-4">{description}</div>
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
        return 'text-blue-600';
      case 'semi':
        return 'text-orange-600';
      case 'auto':
        return 'text-green-600';
    }
  };
  return (
    <div className="flex items-center py-3 border-b border-gray-100">
      <div className={`${iconColor} mr-3`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{title}</div>
        <div className="text-xs text-gray-500">{service}</div>
      </div>
      <div className="text-xs text-gray-500 mr-4">{time}</div>
      <div className={`text-xs font-medium mr-4 ${getModeStyle(incident.automationMode)}`}>{status}</div>
      <Button variant="default" size="icon" className="h-8 w-8" onClick={() => navigate(`/incident/${incident.id}`)}>
        <Eye className="h-4 w-4" />
        <span className="sr-only">View details</span>
      </Button>
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
    <div className="flex items-center py-4 border-b border-gray-100">
      <div className="bg-blue-50 p-2 rounded-md mr-4">
        <Icon className="h-5 w-5 text-blue-500" />
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{title}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
      <Button variant="default" size="icon" className="h-8 w-8">
        <MoreVertical className="h-4 w-4" />
        <span className="sr-only">View details</span>
      </Button>
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
    <div className="flex items-center py-3 border-b border-gray-100">
      <div className="mr-3">
        <Icon className="h-5 w-5 text-gray-500" />
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{service}</div>
        <div className="text-xs text-gray-500">{version}</div>
      </div>
      <div className="text-xs text-gray-500 mr-4">{time}</div>
      <div className="text-xs font-medium text-green-600 mr-4">{status}</div>
      <div className="text-xs text-gray-500 mr-4">{statusDetail}</div>
      <Button variant="default" size="icon" className="h-8 w-8">
        <MoreVertical className="h-4 w-4" />
        <span className="sr-only">More options</span>
      </Button>
    </div>
  )
}

