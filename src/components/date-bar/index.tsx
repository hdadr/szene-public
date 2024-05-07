import { cn } from "@/lib/utils";
import { DatePicker } from "./date-picker";

type Props = {
  date: Date;
  onDateChange: (newDate: Date) => void;
  className?: string;
  animateChange?: boolean;
};
export const DateBar = ({ date, onDateChange, className, animateChange }: Props) => {
  return (
    <div
      className={cn(className, "flex p-2 justify-center w-full bg-white dark:bg-slate-900")}>
      <DatePicker date={date} onDateChange={onDateChange} animateChange={animateChange} />
    </div>
  );
};
