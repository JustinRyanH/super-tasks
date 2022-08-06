import { useWatchObserver } from "tools/observer";
import { useColumnContext } from "components/column-provider";

export function useColumns() {
    const columnController = useColumnContext();
    return useWatchObserver(columnController.columns);
}
