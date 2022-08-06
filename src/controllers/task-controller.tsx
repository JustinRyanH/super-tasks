import { Task, UniqueIdType } from "models/task";
import { SingleValueObserver } from "tools/observer";

export const ALL_TASKS = [
  new Task({ title: "Task A", assignees: ['Jim', 'Bill', 'Sal'] }),
  new Task({ title: "Task B", assignees: ['Jill', 'Bill'] }),
  new Task({ title: "Task C", assignees: ['Jill', 'Jim'] }),
];

type MaybeTask = Task | null

export class TaskController {
  #activeTask = new SingleValueObserver<MaybeTask>(null);
  #tasks: SingleValueObserver<Task[]>;

  constructor({ tasks = ALL_TASKS } = {}) {
    this.#tasks = new SingleValueObserver(tasks);
  }

  get tasks() {
    return this.#tasks;
  }

  get activeTask() {
    return this.#activeTask;
  }

  setActiveTask(id: UniqueIdType) {
    const task = this.tasks.value.find(task => task.id === id) || null;
    this.#activeTask.updateValue(task);
  }

  clearActiveTask() {
    this.#activeTask.updateValue(null);
  }
}
