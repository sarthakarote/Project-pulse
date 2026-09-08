import { activities, dependencies } from '../data/mockData';

// Simple heuristic risk score based on status and weather risk
export function computeRiskScore(activity) {
  let score = 0;
  if (activity.status === 'Delayed') score += 40;
  if (activity.status === 'At Risk') score += 20;
  if (activity.weatherRisk) score += 15;
  if (activity.criticalPath) score += 25;
  
  if (activity.progress === 100) return 0;
  return Math.min(score, 100);
}

// Simple simulator logic that cascades delays
export function runSimulation(activityId, delayDays) {
  let affectedActivities = [];
  let updatedActivities = JSON.parse(JSON.stringify(activities));
  
  let queue = [{ id: activityId, delay: delayDays }];
  
  while(queue.length > 0) {
    let current = queue.shift();
    
    // find targets
    let deps = dependencies.filter(d => d.source === current.id);
    for (let dep of deps) {
      let targetAct = updatedActivities.find(a => a.id === dep.target);
      if (targetAct && targetAct.progress < 100) {
        affectedActivities.push({
          id: targetAct.id,
          name: targetAct.name,
          delay: current.delay,
        });
        queue.push({ id: targetAct.id, delay: current.delay });
      }
    }
  }
  
  // unique affected activities
  const uniqueAffected = Array.from(new Set(affectedActivities.map(a => a.id)))
    .map(id => affectedActivities.find(a => a.id === id));
    
  return uniqueAffected;
}
