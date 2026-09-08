import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock schedule data
const scheduleEvents = [
  { id: 1, title: 'Project Kickoff: Pune Metro', time: '09:00 AM - 11:00 AM', type: 'meeting' },
  { id: 2, title: 'Site Inspection: Sector 4', time: '11:30 AM - 01:00 PM', type: 'inspection' },
  { id: 3, title: 'Contractor Review', time: '02:00 PM - 03:00 PM', type: 'meeting' },
  { id: 4, title: 'Safety Audit', time: '03:30 PM - 05:00 PM', type: 'audit' },
];

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const prevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const nextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="flex h-full flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Header title="Project Schedule" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          
          <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400">
                <CalendarIcon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">4 Events Scheduled</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="icon" onClick={prevDay}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="secondary" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
              <Button variant="secondary" size="icon" onClick={nextDay}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daily Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 space-y-8 pb-4">
                {scheduleEvents.map((event, idx) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative pl-6"
                  >
                    <span className="absolute -left-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-slate-900 ring-2 ring-primary-500">
                      <span className="h-2 w-2 rounded-full bg-primary-500" />
                    </span>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800 group hover:border-primary-200 dark:hover:border-primary-800 transition-colors">
                      <div className="flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 mb-1">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </div>
                      <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                        {event.title}
                      </h4>
                      <div className="mt-2 inline-flex items-center rounded-full bg-slate-200/50 dark:bg-slate-700/50 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-300 capitalize">
                        {event.type}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
