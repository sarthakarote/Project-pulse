import { Header } from '../components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { History, Calendar, GitBranch, AlertTriangle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const timelineEvents = [
  { date: 'Sep 07, 2026', title: 'Current State', description: 'Foundation Concrete delayed by 2 days. Column Construction at risk due to monsoon window.', type: 'current', icon: Clock },
  { date: 'Sep 01, 2026', title: 'Foundation Concrete Started', description: 'Concrete pour began after excavation completion. 80% progress achieved.', type: 'milestone', icon: GitBranch },
  { date: 'Aug 15, 2026', title: 'Foundation Excavation Complete', description: 'All excavation work finished 2 days ahead of schedule.', type: 'milestone', icon: GitBranch },
  { date: 'Aug 01, 2026', title: 'Site Clearing Complete', description: 'Vegetation removal and land grading completed. Zero safety incidents.', type: 'milestone', icon: GitBranch },
  { date: 'Jul 15, 2026', title: 'Weather Alert Issued', description: 'Heavy monsoon rains predicted for Jul-Sep. Risk mitigation plan activated.', type: 'alert', icon: AlertTriangle },
  { date: 'Jan 01, 2026', title: 'Project Kickoff', description: 'Mumbai Metro Phase 2 officially launched. All teams mobilized.', type: 'milestone', icon: Calendar },
];

const snapshots = [
  { label: 'Jan 2026', progress: 0, activities: 0, status: 'Planned' },
  { label: 'Apr 2026', progress: 15, activities: 2, status: 'On Track' },
  { label: 'Jul 2026', progress: 45, activities: 4, status: 'On Track' },
  { label: 'Sep 2026', progress: 68, activities: 7, status: 'At Risk' },
];

export default function TimeMachine() {
  return (
    <div className="flex h-full flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Header title="Time Machine" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">

          {/* Hero Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-gradient-to-r from-accent-600 via-primary-500 to-emerald-500 p-6 text-white shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <History className="h-6 w-6" />
              <h2 className="text-xl font-bold">Project History & Timeline</h2>
            </div>
            <p className="text-sm text-white/80 max-w-2xl">
              Travel through the project timeline. Track milestones, review past states, and understand how the project evolved from kickoff to today.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Timeline */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent-500" />
                    Event Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative border-l-2 border-accent-200 dark:border-accent-900 ml-4 space-y-6 pb-4">
                    {timelineEvents.map((event, idx) => {
                      const Icon = event.icon;
                      const dotColor = event.type === 'alert' ? 'bg-amber-500' : event.type === 'current' ? 'bg-primary-500' : 'bg-accent-500';
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          className="relative pl-8"
                        >
                          <span className={`absolute -left-[11px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-slate-900 ring-2 ${event.type === 'alert' ? 'ring-amber-400' : 'ring-accent-400'}`}>
                            <span className={`h-2 w-2 rounded-full ${dotColor}`} />
                          </span>
                          <div className="rounded-lg border border-slate-100 dark:border-slate-800 p-4 hover:border-accent-200 dark:hover:border-accent-800 transition-colors bg-white dark:bg-slate-900">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className={`h-4 w-4 ${event.type === 'alert' ? 'text-amber-500' : 'text-accent-500'}`} />
                              <span className="text-xs font-bold text-accent-600 dark:text-accent-400">{event.date}</span>
                            </div>
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100">{event.title}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{event.description}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Snapshot Cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Progress Snapshots</h3>
              {snapshots.map((snap, idx) => (
                <motion.div
                  key={snap.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{snap.label}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      snap.status === 'At Risk' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      snap.status === 'On Track' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {snap.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500" style={{ width: `${snap.progress}%` }} />
                    </div>
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{snap.progress}%</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{snap.activities} activities completed</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
