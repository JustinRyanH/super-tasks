import { SingleValueObserver } from "./observer";

interface TaskProps {
  title: string,
  assignees: string[],
}

export class Task {
  readonly id: string;
  #title: SingleValueObserver<string>;
  #assignees: SingleValueObserver<string[]>;

  constructor({ title = "New Task", assignees = [] }: TaskProps) {
    this.id = Math.random().toString();
    this.#title = new SingleValueObserver(title);
    this.#assignees = new SingleValueObserver(assignees);
  }

  get title() {
    return this.#title;
  }

  get assignees() {
    return this.#assignees;
  }
}