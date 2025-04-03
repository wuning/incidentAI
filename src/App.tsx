import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import IncidentListPage from './pages/incident/IncidentListPage'
import IncidentResponseDashboard from './pages/incident/Dashboard'
import AnalysisPage from './pages/incident/AnalysisPage'
import MoreOptionsPage from './pages/incident/MoreOptionsPage'
import ExecutionConfirmPage from './pages/incident/ExecutionConfirmPage'
import OptionDetailPage from './pages/incident/OptionDetailPage'
import RejectConfirmPage from './pages/incident/RejectConfirmPage'
import EmergencyRevokePage from './pages/incident/EmergencyRevokePage'
import IncidentDetailPage from './pages/incident/IncidentDetailPage'
import ListPage from './pages/incident/ListPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/incident/:incidentId" element={<IncidentResponseDashboard />} />
        <Route path="/incident/:incidentId/analysis" element={<AnalysisPage />} />
        <Route path="/incident/:incidentId/more-options" element={<MoreOptionsPage />} />
        <Route path="/incident/:incidentId/execution-confirm" element={<ExecutionConfirmPage />} />
        <Route path="/incident/:incidentId/option-detail" element={<OptionDetailPage />} />
        <Route path="/incident/:incidentId/reject-confirm" element={<RejectConfirmPage />} />
        <Route path="/incident/:incidentId/emergency-revoke" element={<EmergencyRevokePage />} />
        <Route path="/incident/:incidentId/incident-detail" element={<IncidentDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
