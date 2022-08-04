import React from 'react';
import { SingleValueObserver, useWatchObserver } from 'tools/observer';

export function StringCell(props: { observer: SingleValueObserver<string> }) {
    const value = useWatchObserver(props.observer);
    return (<td className="p-2">{value}</td>);
}

export function MultiStringCell(props: { observer: SingleValueObserver<string[]> }) {
    const value = useWatchObserver(props.observer);
    return (<td className="p-2">{value.join(', ')}</td>)
}