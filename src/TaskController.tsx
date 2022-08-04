import { Task } from "./task";

export const ALL_TASKS = [
  new Task({ title: "Task A", assignees: ['Jim', 'Bill', 'Sal'] }),
  new Task({ title: "Task B", assignees: ['Jill', 'Bill'] }),
  new Task({ title: "Task C", assignees: ['Jill', 'Jim'] }),
];


export class TaskController {
  tasks: Task[];

  constructor({ tasks = ALL_TASKS } = {}) {
    this.tasks = tasks;
  }
}
