import { ReactNode } from "react";

export const MainPanel = ({ children }: { children: ReactNode }) => {
  return <div className="grid grid-cols-4 grid-rows-1 gap-8">{children}</div>;
};
