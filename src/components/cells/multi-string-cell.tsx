import React from 'react';
import { useWatchObserver } from 'tools/observer';
import { CellObserverProps } from './index';


export function MultiStringCell(props: CellObserverProps<string[]>) {
    const value = useWatchObserver(props.observer);
    return (<td className="p-2">{value.join(', ')}</td>);
}
