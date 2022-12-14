import React from "react";
import ReactDOM from "react-dom/client";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

import { useWatchObserver } from "tools/observer";
import { TaskController } from "controllers/task-controller";
import { Column, ColumnController, DEFAULT_COLUMNS } from "controllers/column-controller";
import { ColumnProvider } from "components/column-provider";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DraggableRow } from "./components/task-row";
import { useColumns } from "./hooks";
import { TaskControllerProvider } from "components/task-controller-provider";
import { DraggedTaskOverlay } from "./components/dragged-task-overlay";

const ColumnCell = ({ column }: { column: Column }) => <td className="p-2">{column.name}</td>

const Headers = () => {
    const columns = useColumns();

    return (<thead>
        <tr className="bg-slate-600 text-slate-100">
            <td />
            {columns.map(column => <ColumnCell key={column.id} column={column} />)}
        </tr>
    </thead>);
}

const Table = ({ controller }: { controller: TaskController }) => {
    const tasks = useWatchObserver(controller.tasks);
    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { delay: 75, tolerance: 10 } }));

    function handleDragEnd(event: { active: any; over: any; }) {
        const { active, over } = event;

        if (!over) return;
        if (active.id !== over.id) {
            const oldIndex = tasks.findIndex(task => task.id === active.id);
            const newIndex = tasks.findIndex(task => task.id === over.id);

            controller.tasks.updateValue(arrayMove(tasks, oldIndex, newIndex));
        }
        controller.clearActiveTask();
    }

    function handleDragStart(event: { active: any; }) {
        const { active } = event;
        controller.setActiveTask(active.id);
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <table className="table-auto bg-slate-300">
                <Headers />
                <tbody>
                    <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                        {tasks.map(task => <DraggableRow key={task.id} task={task} />)}
                    </SortableContext>
                </tbody>
            </table>
            <DraggedTaskOverlay />
        </DndContext>
    )
}

const App = (props: { controller: TaskController }) => {
    const columnController = new ColumnController(DEFAULT_COLUMNS);
    return (<>
        <div className="w-full flex justify-center">
            <ColumnProvider controller={columnController}>
                <TaskControllerProvider controller={props.controller}>
                    <Table controller={props.controller} />
                </TaskControllerProvider>
            </ColumnProvider>
        </div>
    </>)
};

const container = document.getElementById('root');
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<App controller={new TaskController()} />);
}
