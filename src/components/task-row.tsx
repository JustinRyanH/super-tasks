import React from "react";

import { Task } from "models/task";
import { Column } from "controllers/column-controller";
import { mapValueToCell } from "./cells";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useColumnContext } from "./column-provider";
import { useWatchObserver } from "../tools/observer";
import { useColumns } from "hooks";

interface RowPropTypes {
    task: Task,
    [x: string]: any,
}

export const TaskRow = React.forwardRef<HTMLTableRowElement, RowPropTypes>((props, ref) => {
    const { task, ...rest } = props;
    const columns = useColumns();
    return (<tr ref={ref} {...rest}>{columns.map(column => mapValueToCell(task[column.id], column.id))}</tr>)
});
export const DraggableRow = (props: { task: Task }) => {
    const task = props.task;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        index,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        '--index': index,
    };

    const columnController = useColumnContext();
    const columns = useWatchObserver(columnController.columns);

    const classNameNotDragging = "odd:bg-slate-300 even:bg-slate-200 shadow-inner";
    const classNameDragging = "bg-slate-100 text-slate-200"

    return (<TaskRow
        ref={setNodeRef}
        task={task}
        columns={columns}
        style={style}
        className={isDragging ? classNameDragging : classNameNotDragging}
        {...attributes}
        {...listeners}
    />);
}