import { DragOverlay } from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import React from "react";

import { useTaskController } from "components/task-controller-provider";
import { useColumns } from "hooks";
import { useWatchObserver } from "tools/observer";
import { Row } from "./task-row";

export function DraggedTaskOverlay({ }): JSX.Element {
    const columns = useColumns();
    const taskController = useTaskController();
    const activelyDraggedTask = useWatchObserver(taskController.taskBeingReordered);

    return <DragOverlay modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
        {activelyDraggedTask ? <table><tbody><Row className="bg-slate-300 shadow-lg" task={activelyDraggedTask} columns={columns} /></tbody></table> : null}
    </DragOverlay>;
}
