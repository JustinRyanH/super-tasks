import { Task } from "models/task";
import { SingleValueObserver } from "tools/observer";

export const ALL_TASKS = [
  new Task({ title: "Task A", assignees: ['Jim', 'Bill', 'Sal'] }),
  new Task({ title: "Task B", assignees: ['Jill', 'Bill'] }),
  new Task({ title: "Task C", assignees: ['Jill', 'Jim'] }),
];


export class TaskController {
  #tasks: SingleValueObserver<Task[]>;

  constructor({ tasks = ALL_TASKS } = {}) {
    this.#tasks = new SingleValueObserver(tasks);
  }

  get tasks() {
    return this.#tasks;
  }
}
