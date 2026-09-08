import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Search, Plus, MapPin, Calendar, Users, FolderOpen } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data
const mockProjects = [
  { id: 1, name: 'Mumbai Metro Phase 2', location: 'Mumbai', status: 'In Progress', progress: 65, teamSize: 120, dueDate: '2024-12-01' },
  { id: 2, name: 'Delhi-Meerut RRTS', location: 'Delhi', status: 'Planning', progress: 15, teamSize: 45, dueDate: '2025-06-15' },
  { id: 3, name: 'Bangalore Suburban Rail', location: 'Bangalore', status: 'At Risk', progress: 32, teamSize: 85, dueDate: '2026-03-10' },
  { id: 4, name: 'Chennai Port Maduravoyal', location: 'Chennai', status: 'Completed', progress: 100, teamSize: 200, dueDate: '2023-11-20' },
  { id: 5, name: 'Pune Metro Line 3', location: 'Pune', status: 'In Progress', progress: 45, teamSize: 60, dueDate: '2025-01-30' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || project.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-full flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Header title="Projects Portfolio" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="Search projects or locations..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <select 
                className="h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="In Progress">In Progress</option>
                <option value="Planning">Planning</option>
                <option value="At Risk">At Risk</option>
                <option value="Completed">Completed</option>
              </select>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <FolderOpen className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">No projects found</h3>
              <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={item}>
                  <Card className="h-full flex flex-col hover:border-primary-500/50 transition-colors group cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          project.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                          project.status === 'At Risk' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                          project.status === 'In Progress' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400' :
                          'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                        }`}>
                          {project.status}
                        </span>
                        <div className="text-lg font-bold text-slate-700 dark:text-slate-300">{project.progress}%</div>
                      </div>
                      <CardTitle className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {project.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" /> {project.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <div className="w-full bg-slate-200 rounded-full h-2 mb-4 dark:bg-slate-700 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full ${project.status === 'At Risk' ? 'bg-red-500' : 'bg-gradient-to-r from-primary-500 to-accent-500'}`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" /> {project.teamSize}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" /> {new Date(project.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
