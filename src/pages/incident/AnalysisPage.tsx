import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Terminal, Activity, Database, Network } from 'lucide-react';

const AnalysisPage: React.FC = () => {
  const { incidentId } = useParams();
  const navigate = useNavigate();

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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">AI Analysis Report</h1>
          
          {/* Problem Overview */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Problem Overview</h2>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-orange-800 font-medium">Payment Processing Service Anomaly</p>
                  <p className="text-orange-700 mt-1">
                    Payment API error rate has significantly increased from a baseline of 2% to 23.7%. This issue started after the recent deployment (2025-04-03 14:20),
                    affecting approximately 35% of payment transaction processing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnosis Results */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Diagnosis Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* System Metrics */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Activity className="w-5 h-5 text-blue-500 mr-2" />
                  <h3 className="font-medium text-gray-900">System Metric Anomalies</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• CPU Usage: 87% (Normal Range: &lt;70%)</li>
                  <li>• Memory Usage: 92% (Normal Range: &lt;80%)</li>
                  <li>• Disk I/O Wait: 150ms (Normal Range: &lt;50ms)</li>
                </ul>
              </div>

              {/* Database Status */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Database className="w-5 h-5 text-blue-500 mr-2" />
                  <h3 className="font-medium text-gray-900">Database Status</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Connection Count: 487/500 (Approaching Limit)</li>
                  <li>• Query Response Time: 2.3s (Normal &lt;0.5s)</li>
                  <li>• Deadlock Count: 12 (Past 1 Hour)</li>
                </ul>
              </div>

              {/* Application Log Analysis */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Terminal className="w-5 h-5 text-blue-500 mr-2" />
                  <h3 className="font-medium text-gray-900">Application Log Analysis</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Error Pattern: Database Connection Timeout</li>
                  <li>• Impact Scope: Payment Processing Module</li>
                  <li>• First Occurrence: 2 Minutes After Deployment</li>
                </ul>
              </div>

              {/* Network Monitoring */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Network className="w-5 h-5 text-blue-500 mr-2" />
                  <h3 className="font-medium text-gray-900">Network Monitoring</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Network Latency: Normal</li>
                  <li>• DNS Resolution: Normal</li>
                  <li>• Load Balancing: Normal</li>
                </ul>
              </div>
            </div>
          </div>

          {/* AI Conclusion and Suggestion */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">AI Conclusion and Suggestion</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900 font-medium mb-2">Root Cause Analysis</p>
              <p className="text-blue-800 mb-4">
                Based on the diagnosis results, the problem is likely due to improper configuration of the database connection pool in the recently deployed code,
                causing the connection count to surge and approach the limit, leading to a chain reaction causing system response to slow down and error rate to rise.
              </p>
              
              <p className="text-blue-900 font-medium mb-2">Suggested Repair Plan</p>
              <ul className="space-y-2 text-blue-800">
                <li>1. Rollback the recent deployment (Estimated Time: 5 Minutes)</li>
                <li>2. Adjust the database connection pool configuration (Estimated Time: 10 Minutes)</li>
                <li>3. Increase the database connection count limit (Requires DBA Approval)</li>
              </ul>
            </div>
          </div>

          {/* Operation Buttons */}
          <div className="flex justify-end space-x-4">
            <button 
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
              onClick={() => navigate(`/incident/${incidentId}`)}
            >
              Return
            </button>
            <button 
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
              onClick={() => {
                // TODO: Export report logic
              }}
            >
              Export Report
            </button>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => navigate(`/incident/${incidentId}/execution-confirm`)}
            >
              Execute Suggested Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage; 