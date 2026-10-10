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

// Кастомный узел — роль
function RoleNode({ data }) {
  const isFrom = data.side === "from";
  return (
    <div
      className={`relative px-5 py-4 rounded-xl border-2 transition-all cursor-pointer shadow-lg ${
        data.highlighted
          ? "bg-blue-500/30 border-blue-400 shadow-blue-500/40 scale-105"
          : isFrom
          ? "bg-[#161b22] border-[#484f58] hover:border-blue-500 shadow-black/40"
          : "bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border-blue-500/40 hover:border-blue-400 shadow-blue-500/10"
      }`}
    >
      {!isFrom && (
        <Handle
          type="target"
          position={Position.Left}
          style={{
            background: "#3b82f6",
            width: 10,
            height: 10,
            border: "2px solid #0d1117",
          }}
        />
      )}

      <div className="text-xs uppercase tracking-wider text-[#8b949e] mb-1">
        {isFrom ? "Из" : "В"}
      </div>
      <div className="text-sm font-bold text-[#e6edf3] whitespace-nowrap">
        {data.label}
      </div>
      <div className="text-xs text-[#8b949e] mt-1">
        {data.count} {data.count === 1 ? "история" : "историй"}
      </div>

      {isFrom && (
        <Handle
          type="source"
          position={Position.Right}
          style={{
            background: "#3b82f6",
            width: 10,
            height: 10,
            border: "2px solid #0d1117",
          }}
        />
      )}
    </div>
  );
}

// ВАЖНО: определяем снаружи компонента, чтобы React Flow не ругался
const NODE_TYPES = { role: RoleNode };

export default function TransitionMap({ stories, onNodeClick, selectedRole }) {
  // Мемоизируем nodeTypes, чтобы React Flow не видел "новый объект" при каждом рендере
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
            stroke: "#3b82f6",
            strokeWidth: 3,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#3b82f6",
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
        <Background color="#30363d" gap={20} size={1} />
        <Controls
          className="!bg-[#161b22] !border-[#30363d]"
          showInteractive={false}
        />
        <MiniMap
          className="!bg-[#0d1117] !border-[#30363d]"
          nodeColor="#3b82f6"
          maskColor="rgba(13, 17, 23, 0.8)"
        />
      </ReactFlow>
    </div>
  );
}