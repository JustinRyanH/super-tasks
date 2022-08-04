import { SingleValueObserver } from "tools/observer";


type ColumnId = 'title' | 'assignees';

const TITLE_COLUMN: Column = {
  id: 'title',
  name: 'Title',
};
const ASSIGNEES_COLUMN: Column = {
  id: 'assignees',
  name: 'Assignees',
};

export const DEFAULT_COLUMNS = [
  TITLE_COLUMN,
  ASSIGNEES_COLUMN,
];

export interface Column {
  id: ColumnId,
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
