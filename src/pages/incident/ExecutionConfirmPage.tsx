import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Clock, CheckCircle2, AlertTriangle, Terminal } from 'lucide-react';

const ExecutionConfirmPage: React.FC = () => {
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Execution Confirmation</h1>
          
          {/* Selected Solution Summary */}
          <div className="mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">Selected Repair Solution</h2>
              <p className="text-blue-800">
                Adjust database connection pool configuration to resolve high connection count issue
              </p>
              <div className="mt-3 flex items-center space-x-6">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-700">Estimated Time: 10 minutes</span>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-700">Impact Scope: Payment Service</span>
                </div>
              </div>
            </div>
          </div>

          {/* Execution Steps */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Execution Steps</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-green-600">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-medium text-gray-900">Backup Current Configuration</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Automatically backup current database connection pool configuration file for quick rollback if needed.
                  </p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-medium text-gray-900">Update Connection Pool Parameters</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Adjust the maximum connection count to 300, set the idle timeout to 60 seconds, and set the minimum connection count to 50.
                  </p>
                </div>
                <Terminal className="w-5 h-5 text-gray-400" />
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-medium text-gray-900">Restart Connection Pool</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Smoothly restart the database connection pool to ensure service continuity.
                  </p>
                </div>
                <Terminal className="w-5 h-5 text-gray-400" />
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-medium text-gray-900">Verify Repair Effect</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Monitor system indicators for 5 minutes to confirm whether the error rate has returned to normal levels.
                  </p>
                </div>
                <Terminal className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Risk Warning */}
          <div className="mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-base font-medium text-yellow-800">Execution Risk</h3>
                  <ul className="mt-2 space-y-1 text-sm text-yellow-700">
                    <li>• There may be a brief response delay during the connection pool restart process</li>
                    <li>• If the new configuration is not suitable, multiple adjustments may be required</li>
                    <li>• Continuous monitoring of system stability for about 30 minutes is required</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Rollback Plan */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Rollback Plan</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-600">
                If the repair effect is not satisfactory, the system will automatically:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>1. Immediately restore the backed-up configuration file</li>
                <li>2. Restart connection pool to restore original configuration</li>
                <li>3. Notify the operation team for manual intervention</li>
              </ul>
            </div>
          </div>

          {/* Confirm Buttons */}
          <div className="flex justify-end space-x-4">
            <button 
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
              onClick={() => navigate(`/incident/${incidentId}/more-options`)}
            >
              Back to Options
            </button>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => navigate(`/incident/${incidentId}/incident-detail`)}
            >
              Confirm and Execute
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionConfirmPage; 