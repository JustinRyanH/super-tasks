import { TaskController } from "controllers/task-controller";
import React from "react";

export const TaskControllerContext = React.createContext<TaskController | undefined>(undefined);

interface Props {
    controller: TaskController,
    children: JSX.Element,
}

export function TaskControllerProvider({ controller, children }: Props): JSX.Element {
    return (<TaskControllerContext.Provider value={controller}>
        {children}
    </TaskControllerContext.Provider>);
}

export function useTaskController(): TaskController {
    const taskController = React.useContext(TaskControllerContext);
    if (!taskController) throw new Error("Invalid Context: Wrap with a <TaskControllerProvider />");
    return taskController;
}