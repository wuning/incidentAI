import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, AlertCircle, CheckCircle2, Clock, Shield, Zap, BarChart2 } from 'lucide-react';

const MoreOptionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { incidentId } = useParams();

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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Available Repair Solutions</h1>
          
          {/* Current Problem Summary */}
          <div className="mb-8">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-orange-800 font-medium">Current Issue: Payment Processing Service Anomaly</p>
                  <p className="text-orange-700 mt-1">
                    Impact Scope: 35% Transactions Affected | Estimated Loss: $15,000/minute
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Repair Solution List */}
          <div className="space-y-4">
            {/* Solution 1 */}
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Quick Fix: Rollback Deployment</h3>
                  </div>
                  <p className="mt-2 text-gray-600">
                    Roll back the system to the last stable version (2025-04-03 14:15), this is the fastest way to restore service.
                  </p>
                  <div className="mt-4 flex items-center space-x-6">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">Estimated Time: 5 minutes</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-gray-600">Success Rate: 95%</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-blue-500 mr-1" />
                      <span className="text-sm text-gray-600">Risk Level: Low</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  onClick={() => navigate(`/incident/${incidentId}/execution-confirm`)}
                >
                  Choose This Solution
                </button>
              </div>
            </div>

            {/* Solution 2 */}
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <BarChart2 className="w-5 h-5 text-blue-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Optimization Plan: Adjust Database Connection Pool</h3>
                  </div>
                  <p className="mt-2 text-gray-600">
                    By adjusting the connection pool configuration parameters to solve the problem of too many connections, while maintaining other improvements of the current version.
                  </p>
                  <div className="mt-4 flex items-center space-x-6">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">Estimated Time: 10 minutes</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-gray-600">Success Rate: 85%</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-blue-500 mr-1" />
                      <span className="text-sm text-gray-600">Risk Level: Medium</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => navigate(`/incident/${incidentId}/option-detail`)}
                >
                  Choose This Solution
                </button>
              </div>
            </div>

            {/* Solution 3 */}
            <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-green-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Long-term Plan: Expand Database Capacity</h3>
                  </div>
                  <p className="mt-2 text-gray-600">
                    Increase the database connection limit and optimize the database configuration. It requires DBA team participation, but it can solve the problem from the root.
                  </p>
                  <div className="mt-4 flex items-center space-x-6">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">Estimated Time: 30 minutes</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-gray-600">Success Rate: 99%</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-blue-500 mr-1" />
                      <span className="text-sm text-gray-600">Risk Level: Low</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  onClick={() => navigate(`/incident/${incidentId}/option-detail`)}
                >
                  Choose This Solution
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <button 
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
              onClick={() => navigate(`/incident/${incidentId}/option-detail`)}
            >
              Customized Plan
            </button>
            <button 
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
              onClick={() => navigate(`/incident/${incidentId}/reject-confirm`)}
            >
              Reject All Suggestions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreOptionsPage; 