import { SingleValueObserver } from 'tools/observer';

export interface CellObserverProps<T> {
    observer: SingleValueObserver<T>,
};

import { StringCell } from './string-cell';
import { MultiStringCell } from './multi-string-cell';

export const isStringObserver = (o: SingleValueObserver<any>): o is SingleValueObserver<string>  => {
  if (typeof o.value === 'string') return true;
  return false;
}

export const isArrayStringObserver = (o: SingleValueObserver<any>): o is SingleValueObserver<string[]> => {
  if (!Array.isArray(o.value)) return false;
  if (o.value.find(value => typeof value !== 'string')) return false;
  return true;
}

export function mapValueToCell(observer: SingleValueObserver<any>) {
    if (isStringObserver(observer)) return StringCell({ observer });
    if (isArrayStringObserver(observer)) return MultiStringCell({ observer });
    throw new Error("Unhandled Column Type");
}

export { StringCell, MultiStringCell };