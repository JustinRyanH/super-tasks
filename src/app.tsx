import React from "react";
import ReactDOM from "react-dom";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { useWatchObserver } from "tools/observer";
import { Task } from "models/task";
import { TaskController } from "controllers/task-controller";
import { Column, ColumnController, DEFAULT_COLUMNS } from "controllers/column-controller";
import { ColumnProvider, useColumnContext } from "components/column-provider";
import { mapValueToCell } from "components/cells";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface App {
  tasks: Task[],
}

declare global {
  interface Window { taskController: TaskController }
}

window.taskController = window.taskController || new TaskController();

const ColumnCell = ({ column }: { column: Column }) => <td className="p-2">{column.name}</td>

const Headers = () => {
  const columnController = useColumnContext();
  const columns = useWatchObserver(columnController.columns);

  return (<thead>
    <tr className="bg-slate-600 text-slate-100">
      {columns.map(column => <ColumnCell key={column.id} column={column} />)}
    </tr>
  </thead>);
}


const TaskRow = (props: { task: Task }) => {
  const task = props.task;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    index,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    '--index': index,
  };

  const columnController = useColumnContext();
  const columns = useWatchObserver(columnController.columns);

  return (<tr
    ref={setNodeRef}
    style={style}
    className="odd:bg-slate-300 even:bg-slate-200 shadow-inner"
    {...attributes}
    {...listeners}
  >
    {columns.map(column => mapValueToCell(task[column.id]))}
  </tr>)
}

const Table = ({ controller }: { controller: TaskController }) => {
  const tasks = useWatchObserver(controller.tasks);
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: { active: any; over: any; }) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex(task => task.id === active.id);
      const newIndex = tasks.findIndex(task => task.id === over.id);

      controller.tasks.updateValue(arrayMove(tasks, oldIndex, newIndex));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <table className="table-auto bg-slate-300">
        <Headers />
        <tbody>
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map(task => <TaskRow key={task.id} task={task} />)}
          </SortableContext>
        </tbody>
      </table>
    </DndContext>
  )
}

const App = (props: { controller: TaskController }) => {
  const columnController = new ColumnController(DEFAULT_COLUMNS);
  return (<>
    <div className="w-full flex justify-center">
      <ColumnProvider controller={columnController}>
        <Table controller={props.controller} />
      </ColumnProvider>
    </div>
  </>)
};

ReactDOM.render(<App controller={window.taskController} />, document.getElementById('root'));