import React from "react";
import { SingleValueObserver } from "tools/observer";

export const DEFAULT_COLUMNS = [
  { id: 'title', name: 'Title' },
  { id: 'assignees', name: 'Assignees' },
];


export interface Column {
  id: string,
  name: string,
}

export class ColumnController {
  #columns: SingleValueObserver<Column[]>;

  constructor(columns: Column[]) {
    this.#columns = new SingleValueObserver(columns);
  }

  get columns() {
    return this.#columns;
  }
}
