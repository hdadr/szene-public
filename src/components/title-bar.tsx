import { cn } from "@/lib/utils";

type Props = {
  title: string;
  className?: string;
};

export const TitleBar = ({ title, className}: Props) => {
  return (
    <nav className={cn(className, "w-full bg-white ")}>
      <div className="flex items-center justify-center ">
        <div className=" w-full text-center py-3 dark:text-purple-300 text-purple-600 font-extrabold tracking-wider text-xl">
          {title}
        </div>
      </div>
    </nav>
  );
};
