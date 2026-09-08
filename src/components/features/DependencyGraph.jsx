import React, { useEffect, useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { cn } from '../../lib/utils';
import { activities, dependencies } from '../../data/mockData';

const nodeLight = {
  'Completed': '#f1f5f9',
  'On Track': '#dcfce7',
  'Planned': '#dbeafe',
  'At Risk': '#fef3c7',
  'Delayed': '#fee2e2',
};

const nodeLightBorder = {
  'Completed': '#94a3b8',
  'On Track': '#22c55e',
  'Planned': '#3b82f6',
  'At Risk': '#f59e0b',
  'Delayed': '#ef4444',
};

const nodeDark = {
  'Completed': '#1e293b',
  'On Track': '#064e3b',
  'Planned': '#1e3a8a',
  'At Risk': '#78350f',
  'Delayed': '#7f1d1d',
};

const nodeDarkBorder = {
  'Completed': '#64748b',
  'On Track': '#34d399',
  'Planned': '#60a5fa',
  'At Risk': '#fbbf24',
  'Delayed': '#f87171',
};

const nodeTextLight = '#0f172a';
const nodeTextDark = '#f8fafc';

// Custom Node Component
const CustomNode = ({ data, selected }) => {
  const bg = data.bg || '#f1f5f9';
  const border = data.border || '#94a3b8';
  const text = data.text || '#0f172a';

  return (
    <div
      className={cn(
        "px-4 py-2.5 rounded-md shadow-md border-2 transition-shadow",
        data.criticalPath ? "border-dashed" : "border-solid",
        selected ? "ring-2 ring-primary-500 ring-offset-2" : "hover:shadow-lg"
      )}
      style={{
        borderColor: data.criticalPath ? '#ef4444' : border,
        backgroundColor: bg,
        color: text,
      }}
    >
      <div className="font-semibold text-sm">{data.name}</div>
      <div className="text-xs opacity-70">{data.id}</div>
      {data.delay > 0 && (
        <div className="mt-1 inline-flex items-center rounded-full bg-red-600 px-1.5 py-0.5 text-xs font-bold text-white">
          +{data.delay} days
        </div>
      )}
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

function getNodePalette(status) {
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  return {
    bg: isDark ? nodeDark[status] : nodeLight[status],
    border: isDark ? nodeDarkBorder[status] : nodeLightBorder[status],
    text: isDark ? nodeTextDark : nodeTextLight,
  };
}

const EMPTY_ARRAY = [];

export function DependencyGraph({ simulatedImpact = EMPTY_ARRAY, onNodeClick }) {
  const [isDark, setIsDark] = useState(false);

  // Watch theme changes
  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains('dark'));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const initialEdges = dependencies.map(dep => {
    const sourceImpact = simulatedImpact.find(i => i.id === dep.source);
    const targetImpact = simulatedImpact.find(i => i.id === dep.target);
    const isImpactedEdge = sourceImpact && targetImpact;
    return {
      id: dep.id,
      source: dep.source,
      target: dep.target,
      animated: isImpactedEdge,
      style: { stroke: isImpactedEdge ? '#ef4444' : '#94a3b8', strokeWidth: isImpactedEdge ? 3 : 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: isImpactedEdge ? '#ef4444' : '#94a3b8',
      },
    };
  });

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Build nodes based on theme + simulation
  const buildNodes = useCallback(() => {
    return activities.map((act, idx) => {
      const impact = simulatedImpact.find(i => i.id === act.id);
      let status = act.status;
      let delay = 0;

      if (impact) {
        status = 'Delayed';
        delay = impact.delay;
      }

      const palette = getNodePalette(status);

      return {
        id: act.id,
        type: 'custom',
        position: { x: idx * 250, y: (idx % 2) * 100 + 100 },
        data: {
          ...act,
          status,
          delay,
          ...palette,
        },
      };
    });
  }, [simulatedImpact]);

  useEffect(() => {
    setNodes(buildNodes());
  }, [isDark, simulatedImpact, setNodes, buildNodes]);

  useEffect(() => {
    setEdges((eds) =>
      eds.map(edge => {
        const sourceImpact = simulatedImpact.find(i => i.id === edge.source);
        const targetImpact = simulatedImpact.find(i => i.id === edge.target);
        const isImpactedEdge = sourceImpact && targetImpact;
        return {
          ...edge,
          animated: !!isImpactedEdge,
          style: { stroke: isImpactedEdge ? '#ef4444' : '#94a3b8', strokeWidth: isImpactedEdge ? 3 : 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isImpactedEdge ? '#ef4444' : '#94a3b8',
          },
        };
      })
    );
  }, [simulatedImpact, setEdges]);

  return (
    <div className="h-full w-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(e, node) => onNodeClick && onNodeClick(node.data)}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={16} size={1} color="#94a3b8" />
      </ReactFlow>
    </div>
  );
}
