import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Settings as SettingsIcon, User, Bell, Palette, Save, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialPrefs = {
  delay: true,
  weather: true,
  simulation: false,
  daily: true,
};

function Toggle({ on, onClick }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onClick}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${on ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'}`}
    >
      <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${on ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

export default function SettingsPage() {
  const [projectName, setProjectName] = useState('Mumbai Metro Phase 2');
  const [projectManager, setProjectManager] = useState('Demo User');
  const [email, setEmail] = useState('demo@projectpulse.io');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [riskThreshold, setRiskThreshold] = useState(60);
  const [prefs, setPrefs] = useState(initialPrefs);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Persist profile + preferences to localStorage so they survive navigation
    const settings = {
      projectName,
      projectManager,
      email,
      autoRefresh,
      riskThreshold,
      prefs,
    };
    localStorage.setItem('projectpulse-settings', JSON.stringify(settings));
    // Persist manager name for the sidebar display
    localStorage.setItem('projectpulse-user', projectManager);
    // Notify the sidebar to update the displayed name live
    window.dispatchEvent(new Event('projectpulse-user-updated'));

    // Show success feedback
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const prefItems = [
    { key: 'delay', label: 'Delay alerts', desc: 'Get notified when activities are delayed' },
    { key: 'weather', label: 'Weather warnings', desc: 'Alerts for weather risk to scheduled activities' },
    { key: 'simulation', label: 'Simulation results', desc: 'Notify after running what-if simulations' },
    { key: 'daily', label: 'Daily summary', desc: 'Receive a daily progress summary email' },
  ];

  return (
    <div className="flex h-full flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Header title="Settings" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-6">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 p-6 text-white shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <SettingsIcon className="h-6 w-6" />
              <h2 className="text-xl font-bold">Application Settings</h2>
            </div>
            <p className="text-sm text-white/70">
              Configure your project preferences, notification settings, and display options.
            </p>
          </motion.div>

          {/* Profile Settings */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary-500" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label">Project Name</label>
                    <Input className="mt-1" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                  </div>
                  <div>
                    <label className="label">Project Manager</label>
                    <Input className="mt-1" value={projectManager} onChange={(e) => setProjectManager(e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Email</label>
                    <Input className="mt-1" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notification Settings */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-amber-500" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {prefItems.map((pref) => (
                    <div
                      key={pref.key}
                      className="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-slate-50 transition-colors dark:border-slate-800 dark:hover:bg-slate-800/50"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{pref.label}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{pref.desc}</p>
                      </div>
                      <Toggle
                        on={prefs[pref.key]}
                        onClick={() => setPrefs(prev => ({ ...prev, [pref.key]: !prev[pref.key] }))}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Display & Thresholds */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-accent-500" />
                  Display & Thresholds
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Auto-refresh dashboard</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Automatically refresh data every 30 seconds</p>
                    </div>
                    <Toggle on={autoRefresh} onClick={() => setAutoRefresh(!autoRefresh)} />
                  </div>
                  <div>
                    <label className="label">Risk Score Threshold</label>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Activities above this score are flagged as high risk</p>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={riskThreshold}
                        onChange={(e) => setRiskThreshold(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary-500"
                      />
                      <span className="text-sm font-bold text-primary-600 dark:text-primary-400 w-12 text-right">{riskThreshold}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Save Button */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex items-center justify-end gap-3">
            <AnimatePresence>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Settings saved!
                </motion.span>
              )}
            </AnimatePresence>
            <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:from-primary-700 hover:to-accent-700 hover:shadow-md">
              <Save className="h-4 w-4" />
              Save Settings
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
