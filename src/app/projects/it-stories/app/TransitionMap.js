"use client";

import { useMemo, useCallback, useEffect } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Кнопка «Показать всё»
function FitViewButton() {
  const { fitView } = useReactFlow();
  return (
    <button
      onClick={() => fitView({ padding: 0.05, duration: 600 })}
      className="absolute top-4 right-4 z-10 px-3 py-2 bg-[#130a24]/90 backdrop-blur-xl border border-[#a855f7]/30 rounded-lg text-xs font-mono text-[#a78bfa] hover:text-[#a855f7] hover:border-[#a855f7]/60 transition-all"
    >
      показать всё
    </button>
  );
}

// Кастомный узел — роль (компактнее)
function RoleNode({ data }) {
  const isFrom = data.side === "from";
  return (
    <div
      className={`relative px-4 py-3 rounded-lg border-2 transition-all cursor-pointer ${
        data.highlighted
          ? "bg-[#a855f7]/25 border-[#a855f7] shadow-[0_0_30px_rgba(168,85,247,0.6)] scale-105"
          : isFrom
          ? "bg-[#1a0f30]/90 border-[#a855f7]/25 hover:border-[#a855f7]/70 shadow-lg shadow-black/40"
          : "bg-gradient-to-br from-[#a855f7]/20 to-[#ec4899]/20 border-[#a855f7]/50 hover:border-[#a855f7] shadow-lg shadow-[#a855f7]/20"
      }`}
    >
      {!isFrom && (
        <Handle
          type="target"
          position={Position.Left}
          style={{
            background: "#a855f7",
            width: 8,
            height: 8,
            border: "2px solid #0a0514",
            boxShadow: "0 0 8px #a855f7",
          }}
        />
      )}

      <div className="text-[10px] uppercase tracking-wider text-[#7c6f9e] mb-0.5 font-mono">
        {isFrom ? "Из" : "В"}
      </div>
      <div className="text-xs font-bold text-[#f5f3ff] whitespace-nowrap">
        {data.label}
      </div>
      <div className="text-[10px] text-[#a78bfa] mt-0.5">
        {data.count} {data.count === 1 ? "история" : "историй"}
      </div>

      {isFrom && (
        <Handle
          type="source"
          position={Position.Right}
          style={{
            background: "#a855f7",
            width: 8,
            height: 8,
            border: "2px solid #0a0514",
            boxShadow: "0 0 8px #a855f7",
          }}
        />
      )}
    </div>
  );
}

const NODE_TYPES = { role: RoleNode };

function TransitionMapInner({ stories, onNodeClick, selectedRole }) {
  const nodeTypes = useMemo(() => NODE_TYPES, []);

  const { initialNodes, initialEdges } = useMemo(() => {
    const rolesMap = new Map();
    const transitionsMap = new Map();

    stories.forEach((story) => {
      const from = story.from_role?.trim();
      const to = story.to_role?.trim();

      if (from) rolesMap.set(from, (rolesMap.get(from) || 0) + 1);
      if (to) rolesMap.set(to, (rolesMap.get(to) || 0) + 1);
      if (from && to) {
        const key = `${from}→${to}`;
        transitionsMap.set(key, (transitionsMap.get(key) || 0) + 1);
      }
    });

    const fromRoles = new Set();
    const toRoles = new Set();

    stories.forEach((story) => {
      if (story.from_role?.trim()) fromRoles.add(story.from_role.trim());
      if (story.to_role?.trim()) toRoles.add(story.to_role.trim());
    });

    const fromList = Array.from(fromRoles);
    const toList = Array.from(toRoles).filter((r) => !fromRoles.has(r));

    const nodes = [];

    fromList.forEach((role, i) => {
      nodes.push({
        id: role,
        type: "role",
        position: { x: 0, y: i * 100 },
        data: {
          label: role,
          count: rolesMap.get(role) || 0,
          highlighted: selectedRole === role,
          side: "from",
        },
      });
    });

    toList.forEach((role, i) => {
      nodes.push({
        id: role,
        type: "role",
        position: { x: 500, y: i * 100 },
        data: {
          label: role,
          count: rolesMap.get(role) || 0,
          highlighted: selectedRole === role,
          side: "to",
        },
      });
    });

    const edges = Array.from(transitionsMap.entries()).map(
      ([key, count], i) => {
        const [from, to] = key.split("→");
        return {
          id: `edge-${i}`,
          source: from,
          target: to,
          type: "smoothstep",
          animated: true,
          style: {
            stroke: "#a855f7",
            strokeWidth: 2,
          },
          label: `${count}`,
          labelStyle: {
            fill: "#f5f3ff",
            fontWeight: 700,
            fontSize: 11,
          },
          labelBgStyle: {
            fill: "#1a0f30",
            fillOpacity: 1,
          },
          labelBgPadding: [6, 4],
          labelBgBorderRadius: 4,
        };
      }
    );

    return { initialNodes: nodes, initialEdges: edges };
  }, [stories, selectedRole]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  // Авто-fit — центрируем карту после рендера
  useEffect(() => {
    const timeout = setTimeout(() => {
      fitView({ padding: 0.1, duration: 400 });
    }, 150);
    return () => clearTimeout(timeout);
  }, [initialNodes, fitView]);

  const handleNodeClick = useCallback(
    (event, node) => {
      if (onNodeClick) {
        onNodeClick(node.id);
      }
    },
    [onNodeClick]
  );

  if (initialNodes.length === 0) {
    return (
      <div className="app-card p-12 text-center border-dashed">
        <p className="text-[#8b949e]">
          Пока нет историй с переходами. Добавь их в базу данных.
        </p>
      </div>
    );
  }

  return (
    <div className="app-card h-[500px] md:h-[600px] relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        minZoom={0.2}
        maxZoom={1.5}
        attributionPosition="bottom-right"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#a855f7" gap={30} size={1} />
        <Controls
          className="!bg-[#130a24] !border-[#a855f7]/30 !rounded-lg"
          showInteractive={false}
        />
        <MiniMap
          className="!bg-[#0a0514]/90 !border !border-[#a855f7]/30 !rounded-lg"
          nodeColor="#a855f7"
          nodeStrokeColor="#ec4899"
          nodeBorderRadius={4}
          maskColor="rgba(10, 5, 20, 0.85)"
          pannable
          zoomable
          style={{ width: 120, height: 80 }}
        />
      </ReactFlow>
      <FitViewButton />
    </div>
  );
}

export default function TransitionMap(props) {
  return (
    <ReactFlowProvider>
      <TransitionMapInner {...props} />
    </ReactFlowProvider>
  );
}