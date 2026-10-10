"use client";

import { useMemo, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Кастомный узел — роль (Neo-Tokyo)
function RoleNode({ data }) {
  const isFrom = data.side === "from";
  return (
    <div
      className={`relative px-5 py-4 rounded-xl border-2 transition-all cursor-pointer ${
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
            width: 10,
            height: 10,
            border: "2px solid #0a0514",
            boxShadow: "0 0 8px #a855f7",
          }}
        />
      )}

      <div className="text-xs uppercase tracking-wider text-[#7c6f9e] mb-1 font-mono">
        {isFrom ? "Из" : "В"}
      </div>
      <div className="text-sm font-bold text-[#f5f3ff] whitespace-nowrap">
        {data.label}
      </div>
      <div className="text-xs text-[#a78bfa] mt-1">
        {data.count} {data.count === 1 ? "история" : "историй"}
      </div>

      {isFrom && (
        <Handle
          type="source"
          position={Position.Right}
          style={{
            background: "#a855f7",
            width: 10,
            height: 10,
            border: "2px solid #0a0514",
            boxShadow: "0 0 8px #a855f7",
          }}
        />
      )}
    </div>
  );
}

// ВАЖНО: определяем снаружи компонента, чтобы React Flow не ругался
const NODE_TYPES = { role: RoleNode };

export default function TransitionMap({ stories, onNodeClick, selectedRole }) {
  const nodeTypes = useMemo(() => NODE_TYPES, []);

  // Строим узлы и рёбра из историй
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

    // Раскладка: роли «откуда» слева, «куда» справа
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
        position: { x: 50, y: i * 150 + 100 },
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
        position: { x: 500, y: i * 150 + 100 },
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
          animated: true,
          type: "smoothstep",
          style: {
            stroke: "#a855f7",
            strokeWidth: 2.5,
            filter: "drop-shadow(0 0 6px rgba(168, 85, 247, 0.8))",
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#a855f7",
            width: 20,
            height: 20,
          },
        };
      }
    );

    return { initialNodes: nodes, initialEdges: edges };
  }, [stories, selectedRole]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Обновляем узлы при изменении selectedRole
  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

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
    <div className="app-card overflow-hidden" style={{ height: "600px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#a855f7" gap={30} size={1} />
        <Controls
          className="!bg-[#130a24] !border-[#a855f7]/30 !rounded-lg"
          showInteractive={false}
        />
        <MiniMap
          className="!bg-[#0a0514] !border-[#a855f7]/30 !rounded-lg"
          nodeColor="#a855f7"
          maskColor="rgba(10, 5, 20, 0.85)"
        />
      </ReactFlow>
    </div>
  );
}