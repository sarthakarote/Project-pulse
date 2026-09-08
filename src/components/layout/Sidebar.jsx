import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  FolderOpen,
  CalendarDays,
  Activity,
  GitMerge,
  TestTube2,
  History,
  FileText,
  Bell,
  Settings,
} from 'lucide-react';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Schedule', href: '/schedule', icon: CalendarDays },
  { name: 'Daily Progress', href: '/progress', icon: Activity },
  { name: 'Dependencies', href: '/dependencies', icon: GitMerge },
  { name: 'What-If Simulator', href: '/simulator', icon: TestTube2 },
  { name: 'Time Machine', href: '/time-machine', icon: History },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Notifications', href: '/notifications', icon: Bell, badge: 3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const [userName, setUserName] = useState(() =>
    (typeof window !== 'undefined' && localStorage.getItem('projectpulse-user')) || 'Demo User'
  );

  // Listen for settings saves so the sidebar updates the displayed name live
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = () => setUserName(localStorage.getItem('projectpulse-user') || 'Demo User');
    window.addEventListener('projectpulse-user-updated', handler);
    return () => window.removeEventListener('projectpulse-user-updated', handler);
  }, []);

  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 transition-colors">
      <div className="flex h-16 items-center gap-2 border-b border-slate-100 px-6 dark:border-slate-800">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-600 text-white shadow-md">
          <Activity className="h-4 w-4" aria-hidden="true" />
        </span>
        <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400">
          ProjectPulse
        </h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                isActive
                  ? 'text-primary-700 dark:text-primary-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200',
                'group relative flex items-center rounded-lg px-3 py-2 text-sm transition-all duration-200 ease-in-out'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/40 dark:to-accent-900/40"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {isActive && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-primary-500 to-accent-500" aria-hidden="true" />
              )}
              <item.icon
                className={cn(
                  isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300',
                  'mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-150 z-10 relative'
                )}
                aria-hidden="true"
              />
              <span className="flex-1 font-medium z-10 relative">{item.name}</span>
              {item.badge && (
                <span className="z-10 relative ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-100 px-1.5 text-xs font-semibold text-red-600 ring-1 ring-inset ring-red-600/10 dark:bg-red-500/20 dark:text-red-400 dark:ring-red-500/20">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="flex items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-accent-100 font-bold text-primary-700 ring-1 ring-inset ring-primary-600/20 dark:from-primary-900/50 dark:to-accent-900/50 dark:text-primary-400">
            {userName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'PM'}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{userName}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Project Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}
