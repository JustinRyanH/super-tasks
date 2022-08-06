import React from "react";
import ReactDOM from "react-dom";
import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { useWatchObserver } from "tools/observer";
import { Task } from "models/task";
import { TaskController } from "controllers/task-controller";
import { Column, ColumnController, DEFAULT_COLUMNS } from "controllers/column-controller";
import { ColumnProvider, useColumnContext } from "components/column-provider";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Row } from "./components/row";

function useColumns() {
    const columnController = useColumnContext();
    return useWatchObserver(columnController.columns);
}

const ColumnCell = ({column}: { column: Column }) => <td className="p-2">{column.name}</td>

const Headers = () => {
    const columns = useColumns();

    return (<thead>
    <tr className="bg-slate-600 text-slate-100">
        {columns.map(column => <ColumnCell key={column.id} column={column}/>)}
    </tr>
    </thead>);
}

const DraggableRow = (props: { task: Task }) => {
    const task = props.task;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        index,
        isDragging,
    } = useSortable({id: task.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        '--index': index,
    };

    const columnController = useColumnContext();
    const columns = useWatchObserver(columnController.columns);

    const classNameNotDragging = "odd:bg-slate-300 even:bg-slate-200 shadow-inner";
    const classNameDragging = "bg-slate-100 text-slate-200"

    return (<Row
        ref={setNodeRef}
        task={task}
        columns={columns}
        style={style}
        className={isDragging ? classNameDragging : classNameNotDragging}
        {...attributes}
        {...listeners}
    />);
}

const Table = ({controller}: { controller: TaskController }) => {
    const columns = useColumns();
    const [activeId, setActiveId] = React.useState(null);
    const tasks = useWatchObserver(controller.tasks);
    const sensors = useSensors(useSensor(PointerSensor, {activationConstraint: {delay: 75, tolerance: 10}}));

    function handleDragEnd(event: { active: any; over: any; }) {
        const {active, over} = event;

        if (active.id !== over.id) {
            const oldIndex = tasks.findIndex(task => task.id === active.id);
            const newIndex = tasks.findIndex(task => task.id === over.id);

            controller.tasks.updateValue(arrayMove(tasks, oldIndex, newIndex));
        }
        setActiveId(null);
    }

    function handleDragStart(event: { active: any; }) {
        const {active} = event;
        setActiveId(active.id);
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <table className="table-auto bg-slate-300">
                <Headers/>
                <tbody>
                <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                    {tasks.map(task => <DraggableRow key={task.id} task={task}/>)}
                </SortableContext>
                </tbody>
            </table>
            <DragOverlay modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
                {activeId ? <Row className="bg-slate-300 shadow-lg" task={tasks.find(task => task.id === activeId)}
                                 columns={columns}/> : null}
            </DragOverlay>
        </DndContext>
    )
}

const App = (props: { controller: TaskController }) => {
    const columnController = new ColumnController(DEFAULT_COLUMNS);
    return (<>
        <div className="w-full flex justify-center">
            <ColumnProvider controller={columnController}>
                <Table controller={props.controller}/>
            </ColumnProvider>
        </div>
    </>)
}; ReactDOM.render(<App controller={new TaskController()}/>, document.getElementById('root'));