import React from "react";
import ReactDOM from "react-dom";
import { SingleValueObserver } from "./observer";

interface TaskProps {
  title: string,
  assignees: string[],
}

class Task {
  readonly id: string;
  #title: SingleValueObserver<string>;
  #assignees: SingleValueObserver<string[]>;

  constructor({ title = "New Task", assignees = [] }: TaskProps) {
    this.id = Math.random().toString();
    this.#title = new SingleValueObserver(title);
    this.#assignees = new SingleValueObserver(assignees);
  }

  get title() {
    return this.#title.value;
  }

  get assignees() {
    return this.#assignees.value;
  }
}

const TaskRow = (props: { task: Task }) => {
  const task = props.task;
  return (<tr className="odd:bg-slate-300 even:bg-slate-200 shadow-inner">
    <td className="p-2">{task.title}</td>
    <td className="p-2">{task.assignees.join(', ')}</td>
  </tr>)
}

const Table = (props: {}) => {
  const tasks = [
    new Task({ title: "Task A", assignees: ['Jim', 'Bill', 'Sal']}),
    new Task({ title: "Task B", assignees: ['Jill', 'Bill']}),
    new Task({ title: "Task C", assignees: ['Jill', 'Jim']}),
  ]
  return (
    <table className="table-auto bg-slate-300">
      <thead>
      <tr className="bg-slate-600 text-slate-100">
        <th>Title</th>
        <th>Assignees</th>
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
      <Table/>
    </div>
  </>)
};

ReactDOM.render(<App/>, document.getElementById('root'));