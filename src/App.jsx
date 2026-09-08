import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Schedule from './pages/Schedule';
import Progress from './pages/Progress';
import Dependencies from './pages/Dependencies';
import Simulator from './pages/Simulator';
import TimeMachine from './pages/TimeMachine';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import SettingsPage from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 transition-colors">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/dependencies" element={<Dependencies />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/time-machine" element={<TimeMachine />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
