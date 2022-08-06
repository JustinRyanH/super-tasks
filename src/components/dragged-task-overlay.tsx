import { DragOverlay } from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import React from "react";

import { useTaskController } from "components/task-controller-provider";
import { useWatchObserver } from "tools/observer";
import { TaskRow } from "./task-row";

export function DraggedTaskOverlay({ }): JSX.Element {
    const taskController = useTaskController();
    const activelyDraggedTask = useWatchObserver(taskController.taskBeingReordered);

    return <DragOverlay modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
        {activelyDraggedTask ? <table><tbody><TaskRow className="bg-slate-300 shadow-lg" task={activelyDraggedTask} /></tbody></table> : null}
    </DragOverlay>;
}
