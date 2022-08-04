import { SingleValueObserver } from 'tools/observer';

export interface CellObserverProps<T> {
    observer: SingleValueObserver<T>,
};

export { StringCell } from './string-cell';
export { MultiStringCell } from './multi-string-cell';
