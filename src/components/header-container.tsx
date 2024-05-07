import { ReactNode } from "react";

export const HeaderContainer = ({ children }: { children: ReactNode }) => {
  return <div className="w-full rounded-b-2xl shadow-[0_1px_0px_0_rgba(0,0,0,0.1)] p-2">{children}</div>;
};
