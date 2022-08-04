import React from "react";
import ReactDOM from "react-dom";
import { useWatchObserver } from "tools/observer";
import { Task } from "models/task";
import { TaskController } from "controllers/task-controller";
import { Column, ColumnController, DEFAULT_COLUMNS } from "./column-controller";

interface App {
  tasks: Task[],
}

declare global {
  interface Window { taskController: TaskController }
}

window.taskController = window.taskController || new TaskController();


const ColumnCell = ({ column }: { column: Column }) => {
  return <td className="p-2">{column.name}</td>
}

const TaskRow = (props: { task: Task }) => {
  const task = props.task;

  const title = useWatchObserver(task.title);
  const assignees = useWatchObserver(task.assignees);

  return (<tr className="odd:bg-slate-300 even:bg-slate-200 shadow-inner">
    <td className="p-2">{title}</td>
    <td className="p-2">{assignees.join(', ')}</td>
  </tr>)
}

const Table = ({ controller }: { controller: TaskController }) => {
  const columnController = new ColumnController(DEFAULT_COLUMNS);
  const tasks = controller.tasks;

  const columns = useWatchObserver(columnController.columns);

  return (
    <table className="table-auto bg-slate-300">
      <thead>
        <tr className="bg-slate-600 text-slate-100">
          {columns.map(column => <ColumnCell key={column.id} column={column} />)}
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => <TaskRow key={task.id} task={task} />)}
      </tbody>
    </table>
  )
}

const App = (props: {}) => {
  return (<>
    <div className="w-full flex justify-center">
      <Table controller={window.taskController} />
    </div>
  </>)
};

ReactDOM.render(<App />, document.getElementById('root'));