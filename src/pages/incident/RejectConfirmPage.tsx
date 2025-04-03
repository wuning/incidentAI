import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Clock, AlertCircle } from 'lucide-react';

const RejectConfirmPage: React.FC = () => {
  const navigate = useNavigate();
  const { incidentId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Top Navigation */}
      <div className="flex items-center mb-6">
        <button 
          className="flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition"
          onClick={() => navigate(`/incident/${incidentId}/more-options`)}
        >
          <ArrowLeft className="w-5 h-5 mr-2 text-gray-500" />
          Back to Options List
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-6">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Confirm Reject All Suggestions?</h1>
          </div>

          {/* Current Issue Reminder */}
          <div className="mb-8">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-orange-800 font-medium">Critical Issue Present</p>
                  <p className="text-orange-700 mt-1">
                    Payment API Error Rate: 23.7% (Normal: &lt;5%)
                    <br />
                    Estimated Business Loss: $15,000/minute
                  </p>
                  <div className="mt-2 flex items-center">
                    <Clock className="w-4 h-4 text-orange-500 mr-1" />
                    <span className="text-sm text-orange-700">Problem Duration: 25 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Warning */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Reject Consequences</h2>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-base font-medium text-red-800 mb-2">Business Impact</h3>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• Payment Service Continuously Abnormal, Affecting User Transactions</li>
                  <li>• Estimated Loss Accumulation ($900,000/hour)</li>
                  <li>• Possible Increase in User Complaints</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-base font-medium text-yellow-800 mb-2">System Risk</h3>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li>• Database Connection Pool Pressure Continuously Increases</li>
                  <li>• System Stability May Further Degrade</li>
                  <li>• May Affect Other Related Services</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Suggested Post-Processing */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Suggested Post-Processing</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-600 mb-3">
                If you choose to reject all automatic repair suggestions, we recommend taking the following measures:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>1. Immediately Notify Relevant Technical Teams for Manual Processing</li>
                <li>2. Prepare Downgrade Plan, Manual Switch to Backup System if Necessary</li>
                <li>3. Notify Business Side in a Timely Manner, Prepare Communication</li>
              </ul>
            </div>
          </div>

          {/* Confirm Button */}
          <div className="flex justify-end space-x-4">
            <button 
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
              onClick={() => navigate(`/incident/${incidentId}/more-options`)}
            >
              Return to Suggestion List
            </button>
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => {
                // TODO: Handle rejection logic
                navigate(`/incident/${incidentId}/incident-detail`);
              }}
            >
              Confirm Reject and Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectConfirmPage; 