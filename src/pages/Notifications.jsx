import { Header } from '../components/layout/Header';
import { notifications } from '../data/mockData';
import { Bell, CheckCircle2, AlertTriangle, Info, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';

const iconMap = {
  'Activity "Foundation Concrete" moved to At Risk': AlertTriangle,
  'New progress report submitted for A-102': CheckCircle2,
  'Simulation run: +5 day delay on A-102': Info,
  'Weather warning: Heavy rain expected next week': AlertTriangle,
  'Project "Mumbai Metro Phase 2" schedule updated': CheckCircle2,
};

const colorMap = {
  'Activity "Foundation Concrete" moved to At Risk': 'from-amber-500 to-orange-600',
  'New progress report submitted for A-102': 'from-emerald-500 to-green-600',
  'Simulation run: +5 day delay on A-102': 'from-blue-500 to-indigo-600',
  'Weather warning: Heavy rain expected next week': 'from-red-500 to-pink-600',
  'Project "Mumbai Metro Phase 2" schedule updated': 'from-purple-500 to-primary-600',
};

export default function Notifications() {
  const unread = notifications.filter(n => !n.read);
  const read = notifications.filter(n => n.read);

  return (
    <div className="flex h-full flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Header title="Notifications" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-6">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-gradient-to-r from-rose-600 via-primary-500 to-accent-600 p-6 text-white shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <Bell className="h-6 w-6" />
              <h2 className="text-xl font-bold">Notifications Center</h2>
            </div>
            <p className="text-sm text-white/80">
              Stay updated on project alerts, activity changes, simulation results, and weather warnings. {unread.length > 0 && `You have ${unread.length} unread notification${unread.length > 1 ? 's' : ''}.`}
            </p>
          </motion.div>

          {/* Unread */}
          {unread.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Unread ({unread.length})
              </h3>
              <div className="space-y-3">
                {unread.map((notif, idx) => {
                  const Icon = iconMap[notif.message] || Bell;
                  const gradient = colorMap[notif.message] || 'from-slate-500 to-slate-600';
                  return (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="flex items-start gap-4 rounded-xl border-2 border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-950/20 p-4 shadow-sm"
                    >
                      <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white shadow-sm`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{notif.message}</p>
                        <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Clock className="h-3 w-3" />
                          {format(parseISO(notif.date), 'MMM dd, yyyy')}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 px-2 py-1 rounded-full">New</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Read */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Earlier ({read.length})
            </h3>
            <div className="space-y-3">
              {read.map((notif, idx) => {
                const Icon = iconMap[notif.message] || Bell;
                const gradient = colorMap[notif.message] || 'from-slate-500 to-slate-600';
                return (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className="flex items-start gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                  >
                    <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white/80 shadow-sm`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-600 dark:text-slate-300">{notif.message}</p>
                      <div className="mt-1 flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                        <Clock className="h-3 w-3" />
                        {format(parseISO(notif.date), 'MMM dd, yyyy')}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
