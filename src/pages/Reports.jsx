import { Header } from '../components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { activities } from '../data/mockData';
import { FileText, Download, Calendar, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const allReports = [
  { id: 'r1', date: '2026-09-06', title: 'Weekly Progress Report', activityId: 'A-103', quantity: 150, unit: 'cum', issues: 'Rain delayed pour by 2 hours', user: 'Ravi Kumar', type: 'weekly' },
  { id: 'r2', date: '2026-09-05', title: 'Daily Field Report', activityId: 'A-103', quantity: 100, unit: 'cum', issues: 'None', user: 'Ravi Kumar', type: 'daily' },
  { id: 'r3', date: '2026-09-04', title: 'Safety Audit Report', activityId: 'A-104', quantity: 0, unit: '', issues: 'PPE compliance at 98%', user: 'Priya Sharma', type: 'audit' },
  { id: 'r4', date: '2026-09-03', title: 'Material Receipt Report', activityId: 'A-105', quantity: 200, unit: 'tons', issues: 'Steel delivery on schedule', user: 'Amit Patel', type: 'material' },
  { id: 'r5', date: '2026-09-02', title: 'Weekly Progress Report', activityId: 'A-102', quantity: 0, unit: '', issues: 'Excavation complete', user: 'Ravi Kumar', type: 'weekly' },
];

const reportTypes = {
  weekly: { color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-700 dark:text-blue-300' },
  daily: { color: 'from-emerald-500 to-green-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-700 dark:text-emerald-300' },
  audit: { color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-700 dark:text-amber-300' },
  material: { color: 'from-purple-500 to-pink-600', bg: 'bg-purple-50 dark:bg-purple-950/30', text: 'text-purple-700 dark:text-purple-300' },
};

export default function Reports() {
  return (
    <div className="flex h-full flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Header title="Reports" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">

          {/* Hero Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-gradient-to-r from-emerald-600 via-accent-500 to-primary-600 p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="h-6 w-6" />
                  <h2 className="text-xl font-bold">Project Reports</h2>
                </div>
                <p className="text-sm text-white/80 max-w-xl">
                  Access all project reports — weekly updates, daily logs, safety audits, and material tracking. Download or review any report.
                </p>
              </div>
              <button className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/30 transition-colors">
                <Download className="h-4 w-4" />
                Export All
              </button>
            </div>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Total Reports', value: allReports.length, color: 'text-primary-600 dark:text-primary-400' },
              { label: 'This Week', value: 3, color: 'text-accent-600 dark:text-accent-400' },
              { label: 'With Issues', value: 2, color: 'text-amber-600 dark:text-amber-400' },
              { label: 'Authors', value: 3, color: 'text-emerald-600 dark:text-emerald-400' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center"
              >
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Reports List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-500" />
                Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {allReports.map((report, idx) => {
                  const style = reportTypes[report.type] || reportTypes.daily;
                  const act = activities.find(a => a.id === report.activityId);
                  return (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      className="flex items-center gap-4 rounded-lg border border-slate-100 dark:border-slate-800 p-4 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors bg-white dark:bg-slate-900"
                    >
                      <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${style.color} text-white shadow-sm`}>
                        <FileText className="h-5 w-5" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{report.title}</h4>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                            {report.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {act?.name || report.activityId} {report.quantity > 0 ? `· ${report.quantity} ${report.unit}` : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-400 flex-shrink-0">
                        <span className="flex items-center gap-1"><User className="h-3 w-3" />{report.user}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{report.date}</span>
                        {report.issues !== 'None' ? (
                          <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400"><AlertCircle className="h-3 w-3" />{report.issues}</span>
                        ) : (
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400"><CheckCircle2 className="h-3 w-3" />No issues</span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
