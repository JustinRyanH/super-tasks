import React from "react";
import ReactDOM from "react-dom";
import { useWatchObserver } from "tools/observer";
import { Task } from "models/task";
import { TaskController } from "controllers/task-controller";
import { Column, ColumnController, DEFAULT_COLUMNS } from "controllers/column-controller";
import { ColumnProvider, useColumnContext } from "components/column-provider";
import { mapValueToCell } from "components/cells";

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
  const columnController = useColumnContext();
  const columns = useWatchObserver(columnController.columns);
  const task = props.task;

  return (<tr className="odd:bg-slate-300 even:bg-slate-200 shadow-inner">
    {columns.map(column => mapValueToCell(task[column.id]))}
  </tr>)
}

const Table = ({ controller }: { controller: TaskController }) => {
  const tasks = controller.tasks;

  return (
    <table className="table-auto bg-slate-300">
      <Headers />
      <tbody>
        {tasks.map(task => <TaskRow key={task.id} task={task} />)}
      </tbody>
    </table>
  )
}

const App = (props: {}) => {
  const columnController = new ColumnController(DEFAULT_COLUMNS);
  return (<>
    <div className="w-full flex justify-center">
      <ColumnProvider controller={columnController}>
        <Table controller={window.taskController} />
      </ColumnProvider>
    </div>
  </>)
};

ReactDOM.render(<App />, document.getElementById('root'));