"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaBullseye, FaCheckCircle, FaTimesCircle, FaRedo } from "react-icons/fa";

// Задачи — правильные ответы (targetColumn: куда должна попасть)
const INITIAL_TASKS = [
  { id: "1", text: "Согласовать ТЗ с заказчиком", priority: "high", targetColumn: "done" },
  { id: "2", text: "Собрать команду проекта", priority: "high", targetColumn: "done" },
  { id: "3", text: "Запустить первый спринт", priority: "high", targetColumn: "inprogress" },
  { id: "4", text: "Провести интервью с командой", priority: "medium", targetColumn: "todo" },
  { id: "5", text: "Определить цели проекта", priority: "high", targetColumn: "done" },
  { id: "6", text: "Составить roadmap", priority: "medium", targetColumn: "inprogress" },
];

const COLUMNS = [
  { id: "todo", title: "To Do", color: "slate", hint: "Запланировано" },
  { id: "inprogress", title: "In Progress", color: "blue", hint: "В работе" },
  { id: "done", title: "Done", color: "green", hint: "Завершено" },
];

// Начальное состояние — все в To Do
const INITIAL_STATE = {
  todo: INITIAL_TASKS.map((t) => t.id),
  inprogress: [],
  done: [],
};

// Карточка задачи
function TaskCard({ task, isDragging, isWrong }) {
  const priorityColors = {
    high: "border-l-red-500",
    medium: "border-l-yellow-500",
    low: "border-l-slate-500",
  };

  return (
    <div
      className={`p-3 bg-slate-800/80 border rounded-lg border-l-4 ${
        priorityColors[task.priority]
      } cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      } ${
        isWrong
          ? "border-red-500/70 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          : "border-white/10 hover:border-blue-500/50"
      } transition-all`}
    >
      <p className="text-sm text-white">{task.text}</p>
      <div className="flex items-center gap-1 mt-2">
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${
            task.priority === "high"
              ? "bg-red-500/20 text-red-300"
              : task.priority === "medium"
              ? "bg-yellow-500/20 text-yellow-300"
              : "bg-slate-500/20 text-slate-300"
          }`}
        >
          {task.priority === "high" ? "Срочно" : task.priority === "medium" ? "Средне" : "Низкий"}
        </span>
        {isWrong && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/30 text-red-200">
            ⚠ Ошибка
          </span>
        )}
      </div>
    </div>
  );
}

function SortableTask({ task, isWrong }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} isDragging={isDragging} isWrong={isWrong} />
    </div>
  );
}

function Column({ column, taskIds, tasks, mistakeIds }) {
  const { setNodeRef } = useDroppable({ id: column.id });

  const colorClasses = {
    slate: "border-slate-500/30",
    blue: "border-blue-500/30",
    green: "border-green-500/30",
  };

  const headerColors = {
    slate: "text-slate-400",
    blue: "text-blue-400",
    green: "text-green-400",
  };

  const columnTasks = taskIds.map((id) => tasks.find((t) => t.id === id)).filter(Boolean);

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-[200px] p-3 rounded-xl border-2 border-dashed ${colorClasses[column.color]} bg-slate-900/30`}
    >
      <h3 className={`text-sm font-bold mb-1 ${headerColors[column.color]} uppercase tracking-wider`}>
        {column.title} <span className="text-slate-500">({columnTasks.length})</span>
      </h3>
      <p className="text-xs text-slate-500 mb-3">{column.hint}</p>
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-2 min-h-[200px]">
          {columnTasks.map((task) => (
  <SortableTask key={task.id} task={task} isWrong={mistakeIds.includes(task.id)} />
))}
        </div>
      </SortableContext>
    </div>
  );
}

export default function PmPlayground() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(INITIAL_STATE);
  const [activeTask, setActiveTask] = useState(null);
  const [result, setResult] = useState(null);
  const [checked, setChecked] = useState(false);
  const [mistakes, setMistakes] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  function findColumn(id) {
    if (COLUMNS.some((c) => c.id === id)) return id;
    for (const col of Object.keys(state)) {
      if (state[col].includes(id)) return col;
    }
    return null;
  }

  function handleDragStart(event) {
    const { active } = event;
    const task = INITIAL_TASKS.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
    setResult(null);
    setChecked(false);
    setMistakes([]);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveTask(null);
    setMistakes([]);

    if (!over) return;

    const activeColumn = findColumn(active.id);
    const overColumn = findColumn(over.id);

    if (!activeColumn || !overColumn || activeColumn === overColumn) return;

    setState((prev) => ({
      ...prev,
      [activeColumn]: prev[activeColumn].filter((id) => id !== active.id),
      [overColumn]: [...prev[overColumn], active.id],
    }));

    setResult(null);
    setChecked(false);
  }

  function checkAnswer() {
  const mistakes = [];

  INITIAL_TASKS.forEach((task) => {
    const currentColumn = findColumn(task.id);
    if (currentColumn !== task.targetColumn) {
      mistakes.push({
        task,
        currentColumn,
        targetColumn: task.targetColumn,
      });
    }
  });

  setMistakes(mistakes);
  setChecked(true);

  if (mistakes.length === 0) {
    setResult("success");
  } else {
    setResult("error");
  }
}

  function reset() {
    setState(INITIAL_STATE);
    setResult(null);
    setChecked(false);
    setMistakes([]);
  }

  const totalInDone = state.done.length;
  const progress = Math.round((totalInDone / INITIAL_TASKS.length) * 100);

  return (
    <>
      {/* Плавающая плашка */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 glass rounded-l-xl px-3 py-4 hover:border-blue-500 transition-all hidden md:flex flex-col items-center gap-2"
        whileHover={{ x: -4 }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
        </span>
        <span
  className="text-xs font-bold text-white flex items-center gap-2"
  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
>
  <FaBullseye className="text-blue-400" />
  PM-задача
</span>
      </motion.button>

      {/* Панель */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed right-0 top-0 h-full w-full md:w-[800px] bg-slate-950 border-l border-slate-800 z-50 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-6 md:p-8">
                {/* Заголовок */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-3xl text-blue-400">
                        <FaBullseye />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold gradient-text font-[family-name:var(--font-space-grotesk)]">
                        PM-задача
                      </h2>
                    </div>
                    <p className="text-sm text-slate-400">
                      Расставь задачи по колонкам правильно — как настоящий PM.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-white text-2xl transition-colors"
                  >
                    ×
                  </button>
                </div>

                {/* Прогресс */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>Завершено задач</span>
                    <span>
                      {totalInDone} / {INITIAL_TASKS.length}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                {/* Kanban */}
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCorners}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex flex-col md:flex-row gap-3 mb-6">
                    {COLUMNS.map((col) => (
  <Column
    key={col.id}
    column={col}
    taskIds={state[col.id]}
    tasks={INITIAL_TASKS}
    mistakeIds={checked ? mistakes.map((m) => m.task.id) : []}
  />
))}
                  </div>

                  <DragOverlay>
                    {activeTask ? <TaskCard task={activeTask} isDragging={false} isWrong={false} /> : null}
                  </DragOverlay>
                </DndContext>

                {/* Кнопки */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <button
                    onClick={checkAnswer}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-white transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                  >
                    Проверить решение
                  </button>
                  <button
                    onClick={reset}
                    className="px-6 py-3 glass rounded-lg font-semibold text-white hover:border-blue-500 transition-all inline-flex items-center gap-2"
                  >
                    <FaRedo />
                    Сбросить
                  </button>
                </div>

                {/* Результат */}
                <AnimatePresence>
                  {result === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="p-6 rounded-2xl bg-green-500/10 border-2 border-green-500/40 mb-6"
                    >
                      <div className="flex items-start gap-4">
                        <FaCheckCircle className="text-4xl text-green-400 flex-shrink-0" />
                        <div>
                          <h3 className="text-xl font-bold text-green-400 mb-2">
                            Успешно пройдено!
                          </h3>
                          <p className="text-slate-300 leading-relaxed">
                            Ты правильно распределил задачи по этапам проекта.
                            Так работает настоящий PM: декомпозирует задачи, приоритизирует
                            и ведёт их по канбану от идеи до результата.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {result === "error" && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="p-6 rounded-2xl bg-red-500/10 border-2 border-red-500/40 mb-6"
  >
    <div className="flex items-start gap-4 mb-4">
      <FaTimesCircle className="text-4xl text-red-400 flex-shrink-0" />
      <div>
        <h3 className="text-xl font-bold text-red-400 mb-2">
          Не всё верно — {mistakes.length} {mistakes.length === 1 ? "ошибка" : mistakes.length < 5 ? "ошибки" : "ошибок"}
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Вот что стоит поправить:
        </p>
      </div>
    </div>

    <div className="space-y-3 ml-14">
      {mistakes.map(({ task, currentColumn, targetColumn }) => {
        const currentColName = COLUMNS.find((c) => c.id === currentColumn)?.title;
        const targetColName = COLUMNS.find((c) => c.id === targetColumn)?.title;
        const targetHint = {
          todo: "это ещё не начато, только в планах",
          inprogress: "это уже в работе, но не завершено",
          done: "это уже завершено — базовая задача перед стартом",
        };

        return (
          <div
            key={task.id}
            className="p-3 rounded-lg bg-slate-900/60 border-l-4 border-red-500/60"
          >
            <p className="text-sm text-white font-semibold mb-1">
              {task.text}
            </p>
            <p className="text-xs text-slate-400">
              Сейчас:{" "}
              <span className="text-red-400">{currentColName}</span>
              {" → "}
              Должно быть:{" "}
              <span className="text-green-400">{targetColName}</span>
            </p>
            <p className="text-xs text-slate-500 mt-1 italic">
              {targetHint[targetColumn]}
            </p>
          </div>
        );
      })}
    </div>
  </motion.div>
)}
                </AnimatePresence>

                {/* Легенда */}
                <div className="p-5 glass rounded-xl">
                  <h4 className="text-sm font-bold text-white mb-3">Что это показывает</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">▸</span>
                      <span>Работа с Kanban — стандарт Agile / Scrum</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">▸</span>
                      <span>Приоритизация задач (срочно / средне / низко)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">▸</span>
                      <span>Декомпозиция проекта на этапы: план → работа → результат</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">▸</span>
                      <span>Понимание жизненного цикла задач</span>
                    </li>
                  </ul>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
