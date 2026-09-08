import { cn } from '../../lib/utils';

const colors = {
  'Completed': 'bg-slate-100 text-slate-700 ring-slate-500/20 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 [&>span]:bg-slate-500',
  'On Track': 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20 [&>span]:bg-green-500',
  'Planned': 'bg-primary-50 text-primary-700 ring-primary-600/20 dark:bg-primary-500/10 dark:text-primary-400 dark:ring-primary-500/20 [&>span]:bg-primary-500',
  'At Risk': 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20 [&>span]:bg-amber-500',
  'Delayed': 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20 [&>span]:bg-red-500',
};

export function StatusBadge({ status }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset', colors[status] || colors['Planned'])}>
      <span className="h-1.5 w-1.5 rounded-full" aria-hidden="true" />
      {status}
    </span>
  );
}