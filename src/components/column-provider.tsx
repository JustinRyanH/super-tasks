import { ColumnController } from "controllers/column-controller";
import React from "react";

export const ColumnContext = React.createContext<ColumnController|undefined>(undefined);

export function ColumnProvider({ controller, children }: { controller: ColumnController, children: JSX.Element }) {
  return <ColumnContext.Provider value={controller}>{children}</ColumnContext.Provider>
}

export function useColumnContext(): ColumnController {
  const columns = React.useContext(ColumnContext);
  if (!columns) throw new Error("Invalid Context: Wrap with a <ColumnProvider />");
  return columns;
}