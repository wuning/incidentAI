import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Shield, Database, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock prediction data
let errorRate = 23.7; // Current error rate
// Predict error rate will gradually decrease after repair execution
const generatePredictionData = () => {
  const data = [];
  
  for (let i = 0; i < 12; i++) {
    if (i > 2) {
      // Predict error rate will gradually decrease after repair execution
      errorRate = Math.max(2, errorRate - (Math.random() * 5 + 3));
    }
    data.push({
      time: `+${i * 5}m`,
      actual: i <= 2 ? errorRate : null,
      predicted: i > 2 ? errorRate : null,
    });
  }
  
  return data;
};

const OptionDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { incidentId } = useParams();
  const predictionData = generatePredictionData();

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
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Repair Solution Details</h1>
          
          {/* Solution Overview */}
          <div className="mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Database className="w-6 h-6 text-blue-500 mr-2" />
                <h2 className="text-lg font-semibold text-blue-900">Adjust Database Connection Pool Configuration</h2>
              </div>
              <p className="text-blue-800 mb-4">
                By optimizing the database connection pool configuration parameters, resolve system response issues caused by high connection count.
                This solution aims to balance system performance and resource usage while maintaining service stability.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-700">Estimated Time: 10 minutes</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-700">Risk Level: Medium</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-700">Success Rate: 85%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Technical Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Current Configuration */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Current Configuration</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Maximum Connection Count</span>
                    <span className="font-medium text-gray-900">500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Minimum Connection Count</span>
                    <span className="font-medium text-gray-900">10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Idle Timeout</span>
                    <span className="font-medium text-gray-900">300 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Connection Alive Time</span>
                    <span className="font-medium text-gray-900">1800 seconds</span>
                  </div>
                </div>
              </div>

              {/* Suggested Configuration */}
              <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                <h3 className="font-medium text-gray-900 mb-3">Suggested Configuration</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Maximum Connection Count</span>
                    <span className="font-medium text-blue-600">300</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Minimum Connection Count</span>
                    <span className="font-medium text-blue-600">50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Idle Timeout</span>
                    <span className="font-medium text-blue-600">60 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Connection Alive Time</span>
                    <span className="font-medium text-blue-600">900 seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expected Effect */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Expected Effect</h2>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#e74c3c"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      name="Actual Error Rate"
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#3498db"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 4 }}
                      name="Predicted Error Rate"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-green-800 font-medium">Error Rate</div>
                  <div className="mt-1 text-green-600">
                    Expected to drop below 2%
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-blue-800 font-medium">Response Time</div>
                  <div className="mt-1 text-blue-600">
                    Expected to improve from 2.3s to 0.3s
                  </div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-purple-800 font-medium">Resource Usage</div>
                  <div className="mt-1 text-purple-600">
                    Expected to reduce memory usage by 40%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button 
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
              onClick={() => navigate(`/incident/${incidentId}/more-options`)}
            >
              View More Options
            </button>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => navigate(`/incident/${incidentId}/execution-confirm`)}
            >
              Choose This Solution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionDetailPage; 