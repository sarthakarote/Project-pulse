import { Bell } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';

export function Header({ title }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white/50 backdrop-blur-md px-6 dark:border-slate-800 dark:bg-slate-900/50 sticky top-0 z-10 transition-colors">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <Button variant="ghost" className="hidden sm:inline-flex">
          Project Settings
        </Button>
        <Button variant="ghost" size="icon" className="relative text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
          <span className="sr-only">View notifications</span>
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
        </Button>
      </div>
    </header>
  );
}
