import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const toneStyles = {
  up: {
    badge: 'bg-red-50 text-red-600 ring-red-600/10 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20',
    arrow: '▲',
    bar: 'bg-red-500 dark:bg-red-400',
  },
  down: {
    badge: 'bg-green-50 text-green-600 ring-green-600/10 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20',
    arrow: '▼',
    bar: 'bg-green-500 dark:bg-green-400',
  },
  neutral: {
    badge: 'bg-slate-50 text-slate-500 ring-slate-400/20 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700',
    arrow: '•',
    bar: 'bg-slate-400 dark:bg-slate-500',
  },
};

export function KPICard({ title, value, subtitle, trend, trendLabel, icon: Icon, accent = '#14b8a6', className }) {
  const tone = toneStyles[trend] || toneStyles.neutral;

  return (
    <motion.div 
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn('rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 relative overflow-hidden', className)}
    >
      <span
        className={cn("absolute inset-x-0 top-0 h-1 opacity-80", trend && tone.bar)}
        style={{ backgroundColor: trend ? undefined : accent }}
      />
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3>
        {Icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-400 ring-1 ring-inset ring-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
      </div>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{value}</p>
        {subtitle && <p className="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-medium ring-1 ring-inset', tone.badge)}>
            {tone.arrow}
            {trendLabel}
          </span>
        </div>
      )}
    </motion.div>
  );
}