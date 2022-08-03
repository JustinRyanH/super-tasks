import React from "react";
import ReactDOM from "react-dom";

const TaskRow = (props: { title: String, assignees: Array<String> }) => {

  return (<tr>
    <td>{props.title}</td>
    <td>{props.assignees.join(', ')}</td>
  </tr>)
}

const Table = (props: {}) => {
  return (
    <table>
      <thead>
      <tr>
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
    <Table/>
  </>)
};

ReactDOM.render(<App/>, document.getElementById('root'));