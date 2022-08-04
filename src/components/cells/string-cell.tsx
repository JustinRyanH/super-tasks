import React from 'react';
import { useWatchObserver } from 'tools/observer';
import { CellObserverProps } from './index';


export function StringCell(props: CellObserverProps<string>) {
    const value = useWatchObserver(props.observer);
    return (<td className="p-2">{value}</td>);
}
