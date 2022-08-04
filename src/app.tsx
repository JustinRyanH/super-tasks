import React from "react";
import ReactDOM from "react-dom";

interface SimpleValueObject<T> {
  value: T
  updateValue(newValue: T): void;
}

type ObserverCallback<T> = (observer: SimpleValueObject<T>, values?: { before?: T, after?: T }) => void;

class SingleValueObserver<T> {
  #value: T;
  private subscriptions: Array<ObserverCallback<T>> = [];

  constructor(initialValue: T) {
    this.#value = initialValue;
  }

  get value() { return this.#value; }

  updateValue(newValue: T): void {
    this.#value = newValue;
  }

  observe(cb: ObserverCallback<T>): Function {
    this.subscriptions.push(cb);
    return () => this.stopObserving(cb);
  }

  stopObserving(cb: ObserverCallback<T>): void {
    this.subscriptions = this.subscriptions.filter(callback => callback !== cb);
  }
}


const TaskRow = (props: { title: String, assignees: Array<String> }) => {
  return (<tr className="odd:bg-slate-300 even:bg-slate-200 shadow-inner">
    <td className="p-2">{props.title}</td>
    <td className="p-2">{props.assignees.join(', ')}</td>
  </tr>)
}

const Table = (props: {}) => {
  return (
    <table className="table-auto bg-slate-300">
      <thead>
      <tr className="bg-slate-600 text-slate-100">
        <th>Title</th>
        <th>Assignees</th>
      </tr>
      </thead>
      <tbody>
        <TaskRow title="Task A" assignees={['Jim', 'Bill', 'Sal']} />
        <TaskRow title="Task B" assignees={['Jill', 'Bill']} />
        <TaskRow title="Task C" assignees={['Jill', 'Jim']} />
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