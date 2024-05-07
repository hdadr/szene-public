import { decrementDateByDays, incrementDateByOneDay } from "@/lib/date";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import { DatePopover } from "../date-popover";
import { Button } from "../ui/button";

type Props = {
  date: Date;
  onDateChange: (newDate: Date) => void;
  animateChange?: boolean;
};

export const DatePicker = ({ date, onDateChange, animateChange }: Props) => {
  const previousDay = new Date(decrementDateByDays(date, 1));
  const nextDay = new Date(incrementDateByOneDay(date));

  return (
    <div className="flex align-middle text-textTest">
      <Stepper onPrevClick={() => onDateChange(previousDay)} onNextClick={() => onDateChange(nextDay)}>
        <DatePopover showDayName date={date} onChange={onDateChange} animateChange={animateChange} />
      </Stepper>
    </div>
  );
};

type StepperProps = {
  children: ReactNode;
  onPrevClick: () => void;
  onNextClick: () => void;
};

export const Stepper = ({ children, onPrevClick: onPrev, onNextClick: onNext }: StepperProps) => {
  const iconClasses =
    "flex items-center shadow-sm justify-center rounded-2xl w-12 border bg-card hover:bg-card text-card-foreground dark:border-slate-600 border-slate-300 cursor-pointer";

  return (
    <div className="flex">
      <Button className={iconClasses} onClick={onPrev}>
        <ChevronLeft size={32} />
      </Button>

      <div className="ml-3 mr-3 cursor-pointer">{children}</div>

      <Button className={iconClasses} onClick={onNext}>
        <ChevronRight size={32} />
      </Button>
    </div>
  );
};
