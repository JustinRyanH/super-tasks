import React from 'react';

import { SingleValueObserver } from 'tools/observer';
import { StringCell } from './string-cell';
import { MultiStringCell } from './multi-string-cell';

export interface CellObserverProps<T> {
  observer: SingleValueObserver<T>,
};

export const isStringObserver = (o: SingleValueObserver<any>): o is SingleValueObserver<string> => {
  if (typeof o.value === 'string') return true;
  return false;
}

export const isArrayStringObserver = (o: SingleValueObserver<any>): o is SingleValueObserver<string[]> => {
  if (!Array.isArray(o.value)) return false;
  if (o.value.find(value => typeof value !== 'string')) return false;
  return true;
}

export function mapValueToCell(observer: SingleValueObserver<any>, key?: string) {
  if (isStringObserver(observer)) return <StringCell key={key} observer={observer} />;
  if (isArrayStringObserver(observer)) return <MultiStringCell key={key} observer={observer} />;
  throw new Error("Unhandled Column Type");
}

export { StringCell, MultiStringCell };