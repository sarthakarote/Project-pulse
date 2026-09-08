import { Header } from '../components/layout/Header';
import { KPICard } from '../components/ui/KPICard';
import { ActivityTable } from '../components/features/ActivityTable';
import { activities, kpiStats } from '../data/mockData';
import { AlertCircle, ListChecks, CheckCircle2, AlertTriangle, CalendarClock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const delayedActivities = activities.filter(a => a.status === 'Delayed' || a.status === 'At Risk');

  return (
    <div className="flex h-full flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Header title="Mumbai Metro Phase 2 — Project Overview" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          
          {/* KPI Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <KPICard title="Total Activities" value={kpiStats.total} icon={ListChecks} />
            <KPICard title="Completed" value={kpiStats.completed} subtitle={`${kpiStats.progress}%`} icon={CheckCircle2} accent="#14b8a6" />
            <KPICard title="Delayed / At Risk" value={`${kpiStats.delayed} / ${kpiStats.atRisk}`} trend="up" trendLabel="Needs Attention" icon={AlertTriangle} accent="#ef4444" />
            <KPICard title="Schedule Variance" value={`+${kpiStats.variance} days`} trend="up" trendLabel="Behind Schedule" icon={CalendarClock} accent="#f59e0b" />
          </motion.div>

          {/* Project Health Strip */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-start gap-4 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4 dark:border-amber-900/50 dark:from-amber-950/30 dark:to-orange-950/30"
          >
            <div className="flex-shrink-0 rounded-full bg-amber-100 p-2 dark:bg-amber-900/50">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-200">PROJECT HEALTH — At Risk</h3>
              <div className="mt-1.5 text-sm text-amber-800 dark:text-amber-300">
                <p>
                  3 upcoming activities fall in the monsoon-risk window (Jul–Sep). Recommend front-loading Column Construction.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Delayed Activities Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold leading-6 text-slate-900 dark:text-slate-100">Delayed & At-Risk Activities</h3>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {delayedActivities.length} activities
              </span>
            </div>
            <ActivityTable activities={delayedActivities} />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
