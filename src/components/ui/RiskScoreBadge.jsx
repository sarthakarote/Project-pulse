import { cn } from '../../lib/utils';

export function RiskScoreBadge({ score }) {
  let color = 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20';
  if (score > 60) color = 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20';
  else if (score > 30) color = 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20';

  return (
    <span className={cn('inline-flex items-center rounded-md px-2 py-1 text-xs font-bold ring-1 ring-inset', color)}>
      Risk: {score}
    </span>
  );
}