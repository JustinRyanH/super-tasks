import React from 'react';

export interface SimpleValueObject<T> {
  value: T
  updateValue(newValue: T): void;
}

export type ObserverCallback<T> = (observer: SimpleValueObject<T>, values?: { before?: T, after?: T }) => void;

export class SingleValueObserver<T> {
  #value: T;
  private observers: Array<ObserverCallback<T>> = [];

  constructor(initialValue: T) {
    this.#value = initialValue;
  }

  get value() { return this.#value; }

  updateValue(newValue: T): void {
    const oldValue = this.#value;
    this.#value = newValue;
    this.observers.forEach(ob => ob(this, { before: oldValue, after: newValue }));
  }

  observe(cb: ObserverCallback<T>): Function {
    this.observers.push(cb);
    return () => this.stopObserving(cb);
  }

  stopObserving(cb: ObserverCallback<T>): void {
    this.observers = this.observers.filter(callback => callback !== cb);
  }
}

export function useWatchObserver<T>(observer: SingleValueObserver<T>): T {
  const [value, setValue] = React.useState(observer.value);
  React.useEffect(() => {
    observer.observe(ob => setValue(ob.value));
  }, [observer])
  return value;
}