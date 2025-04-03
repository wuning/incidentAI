import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Clock, Activity, Terminal, Database, Server, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock error rate data
const generateErrorRateData = () => {
  const data = [];
  let errorRate = 2;
  
  for (let i = 0; i < 24; i++) {
    if (i === 12) {
      errorRate = 5;
    } else if (i > 12) {
      errorRate = Math.min(25, errorRate + (Math.random() * 5));
    }
    
    data.push({
      time: `${14}:${String(i * 5).padStart(2, '0')}`,
      errorRate: parseFloat(errorRate.toFixed(1))
    });
  }
  
  return data;
};

const IncidentDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { incidentId } = useParams();
  const errorRateData = generateErrorRateData();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Top Navigation */}
      <div className="flex items-center mb-6">
        <button 
          className="flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition"
          onClick={() => navigate(`/incident/${incidentId}`)}
        >
          <ArrowLeft className="w-5 h-5 mr-2 text-gray-500" />
          Back to Dashboard
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Incident Title */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Payment Processing Service Interruption</h1>
              <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                Severity: High
              </span>
            </div>
            <div className="mt-4 flex items-center space-x-6">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Start Time: 2025-04-03 14:25</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Duration: 25 minutes</span>
              </div>
              <div className="flex items-center">
                <Activity className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Impact Scope: 35% Transactions</span>
              </div>
            </div>
          </div>

          {/* Error Rate Trend Chart */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Error Rate Trend</h2>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={errorRateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="errorRate"
                      stroke="#e74c3c"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      name="Error Rate (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Server className="w-5 h-5 text-blue-500 mr-2" />
                  <h3 className="font-medium text-gray-900">Application Server</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">CPU Usage</span>
                    <span className="text-red-600 font-medium">87%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Memory Usage</span>
                    <span className="text-red-600 font-medium">92%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Request Queue</span>
                    <span className="text-yellow-600 font-medium">1.2k</span>
                  </li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Database className="w-5 h-5 text-blue-500 mr-2" />
                  <h3 className="font-medium text-gray-900">Database</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Active Connections</span>
                    <span className="text-red-600 font-medium">487/500</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="text-red-600 font-medium">2.3s</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Deadlock Count</span>
                    <span className="text-yellow-600 font-medium">12</span>
                  </li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Terminal className="w-5 h-5 text-blue-500 mr-2" />
                  <h3 className="font-medium text-gray-900">Application Logs</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Error Log Count</span>
                    <span className="text-red-600 font-medium">2.3k</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Warning Log Count</span>
                    <span className="text-yellow-600 font-medium">4.5k</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Major Error</span>
                    <span className="text-red-600 font-medium">Connection Timeout</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Event Timeline */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Timeline</h2>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-900">Problem Detection</h3>
                      <span className="ml-3 text-sm text-gray-500">14:25</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      System detected abnormal increase in payment API error rate, triggering alert
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-900">AI Analysis Completed</h3>
                      <span className="ml-3 text-sm text-gray-500">14:27</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      Identified data connection pool configuration issue, generated repair suggestion
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-900">Repair Plan Confirmed</h3>
                      <span className="ml-3 text-sm text-gray-500">14:30</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      Engineer confirmed execution of database connection pool configuration adjustment plan
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-900">Repair in Progress</h3>
                      <span className="ml-3 text-sm text-gray-500">14:32</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      Executing connection pool configuration adjustment, estimated to complete in 10 minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Operation Buttons */}
          <div className="flex justify-end space-x-4">
            <button 
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
              onClick={() => navigate(`/incident/${incidentId}/analysis`)}
            >
              <Terminal className="w-5 h-5 mr-2" />
              View Full Logs
            </button>
            <button 
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => navigate(`/incident/${incidentId}/emergency-revoke`)}
            >
              <XCircle className="w-5 h-5 mr-2" />
              Emergency Revoke
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailPage; 