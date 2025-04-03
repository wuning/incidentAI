import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Clock, Activity, RotateCcw, XCircle } from 'lucide-react';

const EmergencyRevokePage: React.FC = () => {
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
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-6">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Emergency Revoke Repair Operation</h1>
            <p className="text-gray-600">
              This operation will immediately stop the current repair process and rollback executed changes
            </p>
          </div>

          {/* Current Execution Status */}
          <div className="mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-blue-900 mb-3">Current Execution Status</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Activity className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-blue-800">Executing: Adjusting Database Connection Pool Configuration</span>
                  </div>
                  <span className="text-blue-600 text-sm">In Progress</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-blue-800 text-sm">Time Elapsed: 2 minutes / Estimated 10 minutes</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Revoke Impact */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Revoke Impact</h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-base font-medium text-yellow-800 mb-2">System Impact</h3>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li>• Modified connection pool configuration will be restored</li>
                  <li>• Possible temporary service disruption</li>
                  <li>• System will revert to pre-repair state</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="text-base font-medium text-orange-800 mb-2">Business Impact</h3>
                <ul className="space-y-2 text-sm text-orange-700">
                  <li>• Error rate may remain high</li>
                  <li>• Need to re-evaluate and choose other repair solutions</li>
                  <li>• May require longer time to resolve issues</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Revoke Steps */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Revoke Steps</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">1</span>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Stop Current Operation</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Immediately stop the current configuration modification process
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">2</span>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Restore Configuration</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Use the backup configuration file to restore original settings
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">3</span>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Verify System Status</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Confirm that all system indicators are normal after rollback
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Confirm Buttons */}
          <div className="flex justify-end space-x-4">
            <button 
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
              onClick={() => navigate(`/incident/${incidentId}`)}
            >
              <XCircle className="w-5 h-5 mr-2" />
              Cancel
            </button>
            <button 
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => {
                // TODO: Handle revoke logic
                navigate(`/incident/${incidentId}`);
              }}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Confirm Emergency Revoke
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyRevokePage; 