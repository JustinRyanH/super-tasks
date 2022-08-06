import React from "react";

import { Task } from "models/task";
import { Column } from "controllers/column-controller";
import { mapValueToCell } from "./cells";

interface RowPropTypes {
    task: Task,
    columns: Column[],

    [x: string]: any,
}

export const Row = React.forwardRef<HTMLTableRowElement, RowPropTypes>((props, ref) => {
    const {task, columns, ...rest} = props;
    return (<tr ref={ref} {...rest}>{columns.map(column => mapValueToCell(task[column.id]))}</tr>)
});