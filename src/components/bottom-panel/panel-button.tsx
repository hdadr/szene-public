import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
  text?: string;
  linkTo?: string;
  active?: boolean;
};
export const PanelButton = ({ children, text, linkTo, active }: Props) => {
  return (
    <Link className="flex justify-center" to={linkTo ? linkTo : ""} unstable_viewTransition> 
      <div
        className={cn("p-2 inline-flex flex-col items-center justify-center  group cursor-pointer")}>
        <div className={cn(active && "scale-110")}>{children}</div>

        <span
          className={cn("text-xs   dark:group-hover:text-purple-200", !active && "text-gray-500 dark:text-gray-400")}>
          {text}
        </span>
      </div>
    </Link>
  );
};
