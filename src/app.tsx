import React from "react";
import ReactDOM from "react-dom";


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
      <tr>
        <td>Task A</td>
        <td>Jim, Bill</td>
      </tr>
      <tr>
        <td>Task B</td>
        <td>Jill, Bill</td>
      </tr>
      <tr>
        <td>Task C</td>
        <td>Jill, Bill</td>
      </tr>
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