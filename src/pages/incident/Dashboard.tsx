import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  AlertTriangle, 
  ThumbsUp, 
  ThumbsDown, 
  ChevronDown, 
  ChevronRight, 
  Clock,
  ArrowLeft
} from 'lucide-react';
import { ErrorRateChart } from '../../components/charts/ErrorRateChart';
import { ConnectionsChart } from '../../components/charts/ConnectionsChart';
import { IncidentHeader } from '../../components/incident/IncidentHeader';
import { AutomationMode } from '../../types/incident';
import { CONFIDENCE_LEVELS } from '../../constants/incident';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { mockIncidents } from '@/constants/incident';


const IncidentResponseDashboard = () => {
  const { incidentId } = useParams();
  const incident = mockIncidents.find(i => i.id === incidentId);
  const navigate = useNavigate();
  const [automationMode, setAutomationMode] = useState<AutomationMode>(() => incident?.automationMode || 'assist');
  const [expandedEvidence, setExpandedEvidence] = useState<string | null>('evidence3');


  if (!incident) {
    return <div>Incident not found</div>;
  }
  
  const handleModeChange = (mode: AutomationMode) => {
    setAutomationMode(mode);
  };
  
  const toggleEvidence = (id: string) => {
    setExpandedEvidence(expandedEvidence === id ? null : id);
  };

  return (
    <Layout>
      {/* Automation Mode Switch */}
      <div className="flex items-center justify-between mb-6">
        
        <button 
          className="flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-5 h-5 mr-2 text-gray-500" />
          Back
        </button>
        <div className="flex bg-gray-100 rounded-lg p-1">
          {(['assist', 'semi', 'auto'] as const).map((mode) => (
            <button 
              key={mode}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                automationMode === mode 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
              onClick={() => handleModeChange(mode)}
            >
              {mode === 'assist' ? 'Assist Mode' : mode === 'semi' ? 'Semi-Auto' : 'Auto'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Main Panel */}
        <div className="col-span-8 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <IncidentHeader 
              automationMode={automationMode}
              incident={incident}
            />
            
            <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-3 text-red-600 flex items-center">
              <AlertTriangle size={18} className="mr-2" />
              Anomaly Detected: Payment API 5xx error rate increased (Current: {incident.errorRate}%, Threshold: 5%)
            </div>
          </div>

          {/* AI Diagnosis Area */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">AI Diagnosis Summary</h2>
              <p className="text-gray-700 mb-4">
                {automationMode === 'assist' ? 
                  'Based on log analysis and system behavior, diagnosed as database connection pool exhaustion, possibly caused by the new version deployed at 10:30 AM.' : 
                  automationMode === 'semi' ? 
                  'Confirmed as database connection pool exhaustion issue, caused by v3.2 deployment at 10:30 AM today.' : 
                  'Issue resolved: Database connection pool exhaustion caused by v3.2 deployment at 10:30 AM.'}
              </p>
              
              {/* Evidence List */}
              <div className="space-y-3">
                {/* Evidence Item */}
                <div 
                  className={`border rounded-lg overflow-hidden cursor-pointer
                  ${automationMode === 'assist' ? 'border-gray-200 bg-gray-50' : 
                    automationMode === 'semi' ? 'border-blue-200 bg-blue-50' : 
                    'border-green-200 bg-green-50'}`}
                  onClick={() => toggleEvidence('evidence1')}
                >
                  <div className="p-4 flex justify-between items-center">
                    <div className="font-medium">Evidence 1: Database Connections Surge</div>
                    {expandedEvidence === 'evidence1' ? 
                      <ChevronDown size={20} className="text-blue-500" /> : 
                      <ChevronRight size={20} className="text-blue-500" />}
                  </div>
                  
                  {expandedEvidence === 'evidence1' && (
                    <div className="px-4 pb-4 border-t border-gray-200">
                      <div className="pt-3">
                        <p className="text-sm text-gray-700">Connection count rapidly increased from an average of 150 to nearly 500 (connection pool limit), causing new requests to be rejected.</p>
                        <div className="mt-2 h-24 rounded">
                          <ConnectionsChart deployTime="10:30" connectionLimit={500} height={90} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div 
                  className={`border rounded-lg overflow-hidden cursor-pointer
                  ${automationMode === 'assist' ? 'border-gray-200 bg-gray-50' : 
                    automationMode === 'semi' ? 'border-blue-200 bg-blue-50' : 
                    'border-green-200 bg-green-50'}`}
                  onClick={() => toggleEvidence('evidence2')}
                >
                  <div className="p-4 flex justify-between items-center">
                    <div className="font-medium">Evidence 2: Connection Pool Related Errors Increase</div>
                    {expandedEvidence === 'evidence2' ? 
                      <ChevronDown size={20} className="text-blue-500" /> : 
                      <ChevronRight size={20} className="text-blue-500" />}
                  </div>
                  
                  {expandedEvidence === 'evidence2' && (
                    <div className="px-4 pb-4 border-t border-gray-200">
                      <div className="pt-3">
                        <p className="text-sm text-gray-700">Logs show a large number of "Unable to obtain database connection" errors, highly correlated with 5xx errors.</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div 
                  className={`border rounded-lg overflow-hidden cursor-pointer
                  ${automationMode === 'assist' ? 'border-gray-200 bg-gray-50' : 
                    automationMode === 'semi' ? 'border-blue-200 bg-blue-50' : 
                    'border-green-200 bg-green-50'}`}
                  onClick={() => toggleEvidence('evidence3')}
                >
                  <div className="p-4 flex justify-between items-center">
                    <div className="font-medium">Evidence 3: Association with Deployment Time</div>
                    {expandedEvidence === 'evidence3' ? 
                      <ChevronDown size={20} className="text-blue-500" /> : 
                      <ChevronRight size={20} className="text-blue-500" />}
                  </div>
                  
                  {expandedEvidence === 'evidence3' && (
                    <div className="px-4 pb-4 border-t border-gray-200">
                      <div className="pt-3">
                        <p className="text-sm text-gray-700">Deployment time (10:30) after 5 minutes, failure rate increased from 2% to 15%. Detected 3 similar patterns, all related to database connection issues.</p>
                        <div className="mt-2 h-32 rounded">
                          <ErrorRateChart deployTime="10:30" height={120} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div 
                  className={`border rounded-lg overflow-hidden cursor-pointer
                  ${automationMode === 'assist' ? 'border-gray-200 bg-gray-50' : 
                    automationMode === 'semi' ? 'border-blue-200 bg-blue-50' : 
                    'border-green-200 bg-green-50'}`}
                  onClick={() => toggleEvidence('evidence4')}
                >
                  <div className="p-4 flex justify-between items-center">
                    <div className="font-medium">Excluded Assumption: Network Problem</div>
                    {expandedEvidence === 'evidence4' ? 
                      <ChevronDown size={20} className="text-blue-500" /> : 
                      <ChevronRight size={20} className="text-blue-500" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommend Action Area */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {automationMode === 'auto' ? 'Executed Actions' : 'AI Recommended Actions'}
              </h2>
              
              <div className="space-y-4">
                {/* Action Item */}
                <div className={`border rounded-lg overflow-hidden 
                  ${automationMode === 'assist' ? 'border-gray-200' : 
                    'border-green-200 bg-green-50'}`}>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800">
                      {automationMode === 'auto' ? 
                        'Executed: Rollback to Previous Stable Version (v2.4.1)' : 
                        'Option 1: Rollback to Previous Stable Version (v2.4.1)'}
                    </h3>
                    <div className="mt-2 flex items-center text-gray-600 text-sm">
                      <Clock size={16} className="mr-1" />
                      <span>
                        {automationMode === 'auto' ? 
                          'Execution Time: 14:27 | Status: In Progress' : 
                          'Estimated Resolution Time: 3-5 minutes | Confidence: High | Risk: Low'}
                      </span>
                    </div>
                    <div className="mt-3 flex justify-end">
                      {automationMode === 'assist' && (
                        <Button 
                          variant="default"
                          onClick={() => navigate(`/incident/${incidentId}/analysis`)}
                        >
                          Analyze This Option
                        </Button>
                      )}
                      {automationMode === 'semi' && (
                        <Button 
                          variant="default"
                          onClick={() => navigate(`/incident/${incidentId}/execution-confirm`)}
                        >
                          Approve and Execute
                        </Button>
                      )}
                      {automationMode === 'auto' && (
                        <Button 
                          variant="destructive"
                          onClick={() => navigate(`/incident/${incidentId}/emergency-revoke`)}
                        >
                          Emergency Revoke
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Second Action Item */}
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800">
                      {automationMode === 'auto' ? 
                        'Considered Alternative Solutions' : 
                        'Option 2: Increase Database Connection Pool Limit'}
                    </h3>
                    <div className="mt-2 flex items-center text-gray-600 text-sm">
                      {automationMode === 'auto' ? (
                        <span>Increase Database Connection Pool Limit (Higher Risk)</span>
                      ) : (
                        <span>Estimated Resolution Time: 1-2 minutes | Confidence: Medium | Risk: Medium</span>
                      )}
                    </div>
                    <div className="mt-3 flex justify-end">
                      {automationMode === 'assist' && (
                        <Button 
                          variant="default"
                          onClick={() => navigate(`/incident/${incidentId}/analysis`)}
                        >
                          Analyze This Option
                        </Button>
                      )}
                      {automationMode === 'semi' && (
                        <Button 
                          variant="default"
                          onClick={() => navigate(`/incident/${incidentId}/option-detail`)}
                        >
                          Choose This Option
                        </Button>
                      )}
                      {automationMode === 'auto' && (
                        <Button 
                          variant="default"
                          onClick={() => navigate(`/incident/${incidentId}/option-detail`)}
                        >
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Bottom Additional Action */}
                <div 
                  className={`rounded-lg p-3 text-center cursor-pointer transition
                    ${automationMode === 'assist' ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 
                      automationMode === 'semi' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 
                      'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                  onClick={() => {
                    if (automationMode === 'assist') {
                      navigate(`/incident/${incidentId}/more-options`);
                    } else if (automationMode === 'semi') {
                      navigate(`/incident/${incidentId}/reject-confirm`);
                    } else {
                      navigate(`/incident/${incidentId}/incident-detail`);
                    }
                  }}
                >
                  {automationMode === 'assist' ? 
                    'View More Options...' : 
                    automationMode === 'semi' ? 
                    'Reject All Suggestions' : 
                    'Show Execution Progress'}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel */}
        <div className="col-span-4 space-y-6">
          {/* AI Confidence Indicator */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">AI Diagnosis Confidence</h2>
              
              <div>
                <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      automationMode === 'auto' ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${CONFIDENCE_LEVELS[automationMode]}%` }}
                  ></div>
                </div>
                <div className="mt-2 flex justify-between text-sm text-gray-600">
                  <span>0%</span>
                  <span className="font-medium">{CONFIDENCE_LEVELS[automationMode]}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metric Monitoring */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Key Metrics</h2>
              
              <div>
                <div className="text-sm text-gray-700 mb-2">5xx Error Rate (%)</div>
                <div className="rounded-md">
                  <ErrorRateChart deployTime={incident.deployTime} />
                </div>
                
                <div className="text-sm text-gray-700 mb-2 mt-6">Database Connections</div>
                <div className="rounded-md">
                  <ConnectionsChart deployTime={incident.deployTime} connectionLimit={500} />
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Area */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">AI Performance Feedback</h2>
              
              <div className="flex justify-between">
                <Button variant="default" className="flex items-center gap-2">
                  <ThumbsUp size={18} className="text-blue-500" />
                  <span>Helpful</span>
                </Button>
                <Button variant="default" className="flex items-center gap-2">
                  <ThumbsDown size={18} className="text-gray-500" />
                  <span>Improvement</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IncidentResponseDashboard;