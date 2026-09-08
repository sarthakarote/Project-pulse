import { Header } from '../components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { kpiStats } from '../data/mockData';
import { StatusBadge } from '../components/ui/StatusBadge';
import { TrendingUp, CheckCircle2, Clock, AlertTriangle, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

export default function Progress() {
  const today = format(new Date(), 'EEEE, MMMM d, yyyy');

  const summaryCards = [
    { label: 'Completed Today', value: 2, icon: CheckCircle2, color: 'from-emerald-500 to-green-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30', textColor: 'text-emerald-700 dark:text-emerald-300' },
    { label: 'In Progress', value: 3, icon: Clock, color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50 dark:bg-blue-950/30', textColor: 'text-blue-700 dark:text-blue-300' },
    { label: 'Issues Reported', value: 1, icon: AlertTriangle, color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50 dark:bg-amber-950/30', textColor: 'text-amber-700 dark:text-amber-300' },
    { label: 'Overall Progress', value: `${kpiStats.progress}%`, icon: TrendingUp, color: 'from-purple-500 to-pink-600', bg: 'bg-purple-50 dark:bg-purple-950/30', textColor: 'text-purple-700 dark:text-purple-300' },
  ];

  const dailyLogs = [
    { time: '09:15 AM', team: 'Earthworks', activity: 'Site Clearing', note: 'Completed final grading on Sector A. All clear.', status: 'Completed' },
    { time: '10:30 AM', team: 'Concrete', activity: 'Foundation Concrete', note: 'Pour delayed by 2 hours due to equipment malfunction. Resumed at 12:30 PM.', status: 'Delayed' },
    { time: '01:00 PM', team: 'Concrete', activity: 'Column Construction', note: 'Rebar tying in progress for columns C1-C4. 40% complete.', status: 'On Track' },
    { time: '03:00 PM', team: 'Electrical', activity: 'Electrical Ducting', note: 'Duct installation in Zone B completed. Moving to Zone C.', status: 'On Track' },
    { time: '04:30 PM', team: 'Plumbing', activity: 'Drainage Setup', note: 'All drainage pipes tested and approved. Handover pending.', status: 'Completed' },
  ];

  return (
    <div className="flex h-full flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Header title="Daily Progress" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">

          {/* Date Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between rounded-xl bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 p-5 text-white shadow-lg"
          >
            <div>
              <h2 className="text-xl font-bold">{today}</h2>
              <p className="text-sm text-white/80">Mumbai Metro Phase 2 — Daily Field Report</p>
            </div>
            <BarChart3 className="h-8 w-8 text-white/60" />
          </motion.div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {summaryCards.map((card, idx) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`rounded-xl ${card.bg} p-5 border border-transparent hover:shadow-md transition-all`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-sm font-medium ${card.textColor}`}>{card.label}</span>
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${card.color} text-white shadow-sm`}>
                    <card.icon className="h-5 w-5" />
                  </span>
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{card.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Daily Activity Logs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary-500" />
                  Field Activity Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dailyLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-4 rounded-lg border border-slate-100 dark:border-slate-800 p-4 hover:border-primary-200 dark:hover:border-primary-800 transition-colors">
                      <div className="flex-shrink-0">
                        <span className="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/30 px-2 py-1 rounded-md">{log.time}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{log.activity}</span>
                          <span className="text-xs text-slate-400">by {log.team}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{log.note}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <StatusBadge status={log.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
