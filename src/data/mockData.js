import { addDays, subDays } from 'date-fns';

const today = new Date('2026-09-07');

export const projects = [
  { id: 'p1', name: 'Mumbai Metro Phase 2', location: 'Mumbai', start: '2026-01-01', end: '2026-12-31', progress: 68, status: 'At Risk', delayed: 9 },
  { id: 'p2', name: 'NH-48 Widening', location: 'Delhi-Jaipur', start: '2025-06-01', end: '2027-03-31', progress: 45, status: 'On Track', delayed: 2 },
  { id: 'p3', name: 'Chennai Storm Water Drain', location: 'Chennai', start: '2026-03-01', end: '2026-11-30', progress: 82, status: 'On Track', delayed: 0 },
];

export const activities = [
  { id: 'A-101', name: 'Site Clearing', start: subDays(today, 30).toISOString(), end: subDays(today, 25).toISOString(), duration: 5, progress: 100, status: 'Completed', team: 'Earthworks', weatherRisk: false, criticalPath: true },
  { id: 'A-102', name: 'Foundation Excavation', start: subDays(today, 24).toISOString(), end: subDays(today, 10).toISOString(), duration: 14, progress: 100, status: 'Completed', team: 'Earthworks', weatherRisk: true, criticalPath: true },
  { id: 'A-103', name: 'Foundation Concrete', start: subDays(today, 9).toISOString(), end: subDays(today, 2).toISOString(), duration: 7, progress: 80, status: 'Delayed', team: 'Concrete', weatherRisk: true, criticalPath: true },
  { id: 'A-104', name: 'Column Construction', start: subDays(today, 1).toISOString(), end: addDays(today, 14).toISOString(), duration: 15, progress: 0, status: 'At Risk', team: 'Concrete', weatherRisk: true, criticalPath: true },
  { id: 'A-105', name: 'Beam Construction', start: addDays(today, 15).toISOString(), end: addDays(today, 25).toISOString(), duration: 10, progress: 0, status: 'Planned', team: 'Superstructure', weatherRisk: false, criticalPath: true },
  { id: 'A-106', name: 'Drainage Setup', start: subDays(today, 24).toISOString(), end: subDays(today, 5).toISOString(), duration: 19, progress: 100, status: 'Completed', team: 'Plumbing', weatherRisk: true, criticalPath: false },
  { id: 'A-107', name: 'Electrical Ducting', start: subDays(today, 4).toISOString(), end: addDays(today, 10).toISOString(), duration: 14, progress: 20, status: 'On Track', team: 'Electrical', weatherRisk: false, criticalPath: false },
];

export const dependencies = [
  { id: 'd1', source: 'A-101', target: 'A-102', type: 'FS' },
  { id: 'd2', source: 'A-102', target: 'A-103', type: 'FS' },
  { id: 'd3', source: 'A-103', target: 'A-104', type: 'FS' },
  { id: 'd4', source: 'A-104', target: 'A-105', type: 'FS' },
  { id: 'd5', source: 'A-101', target: 'A-106', type: 'FS' },
  { id: 'd6', source: 'A-106', target: 'A-107', type: 'FS' },
];

export const notifications = [
  { id: 'n1', message: 'Activity "Foundation Concrete" moved to At Risk', date: subDays(today, 1).toISOString(), read: false },
  { id: 'n2', message: 'New progress report submitted for A-102', date: subDays(today, 2).toISOString(), read: true },
  { id: 'n3', message: 'Simulation run: +5 day delay on A-102', date: subDays(today, 3).toISOString(), read: true },
  { id: 'n4', message: 'Weather warning: Heavy rain expected next week', date: subDays(today, 4).toISOString(), read: true },
  { id: 'n5', message: 'Project "Mumbai Metro Phase 2" schedule updated', date: subDays(today, 5).toISOString(), read: true },
];

export const reports = [
  { id: 'r1', date: subDays(today, 1).toISOString(), activityId: 'A-103', quantity: 150, unit: 'cum', issues: 'Rain delayed pour', user: 'Ravi Kumar' },
  { id: 'r2', date: subDays(today, 2).toISOString(), activityId: 'A-103', quantity: 100, unit: 'cum', issues: 'None', user: 'Ravi Kumar' },
];

export const kpiStats = {
  total: 124,
  completed: 78,
  delayed: 9,
  atRisk: 14,
  progress: 68,
  variance: 6,
};
