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
        <td>Test Task</td>
        <td>Jim, Bill</td>
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