import { StatusBadge } from '../ui/StatusBadge';
import { RiskScoreBadge } from '../ui/RiskScoreBadge';
import { computeRiskScore } from '../../lib/riskEngine';
import { format, parseISO } from 'date-fns';
import { cn } from '../../lib/utils';
import { Card } from '../ui/Card';

export function ActivityTable({ activities }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:pl-6">Activity</th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Dates</th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Progress</th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Risk Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900">
            {activities.map((activity) => (
              <tr key={activity.id} className="transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/50">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 dark:text-slate-100 sm:pl-6">
                  {activity.name}
                  <div className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{activity.id} | {activity.team}</div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
                  <div>{format(parseISO(activity.start), 'MMM dd')} — {format(parseISO(activity.end), 'MMM dd')}</div>
                  <div className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{activity.duration} days</div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                      <div
                        className={cn('h-full rounded-full transition-all duration-500 ease-in-out', activity.status === 'Delayed' ? 'bg-red-500' : activity.status === 'At Risk' ? 'bg-amber-500' : 'bg-primary-500')}
                        style={{ width: `${activity.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{activity.progress}%</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
                  <StatusBadge status={activity.status} />
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
                  <RiskScoreBadge score={computeRiskScore(activity)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
