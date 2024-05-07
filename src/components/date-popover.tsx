import { formatDateForDisplay } from "@/lib/date";
import { blinkVariant } from "@/lib/framerProps";
import { capitalize } from "@/lib/string";
import { cn } from "@/lib/utils";
import { hu } from "date-fns/locale";
import { motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type Props = {
  date: Date | undefined;
  onChange: (newDate: Date) => void;
  disabled?: boolean;
  text?: string;
  animateChange?: boolean;
  className?: string;
  showDayName?: boolean;
};
export const DatePopover = ({ date, onChange, disabled, text, animateChange, className, showDayName }: Props) => {
  const dayName = new Intl.DateTimeFormat("hu-HU", { weekday: "long" }).format(date);
  const [month, setMonth] = useState<Date>();

  useEffect(() => {
    setMonth(date ?? new Date());
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={"ghost"}
          className={cn(
            "bg-white/95 focus:bg-white/95 justify-start text-left font-normal",
            "rounded-2xl text-xs",
            className
          )}>
          <motion.h2
            className="flex flex-col items-center ml-2 font-semibold text-black/80"
            key={animateChange ? date?.getTime() : ""}
            variants={blinkVariant}
            initial="hidden"
            animate="show"
            exit="hidden">
            <span className="mr-2 flex">
              <CalendarIcon className=" mr-2 h-4 w-4" strokeWidth={2} />
              {text || (date && formatDateForDisplay(date))}
            </span>
            {showDayName && <span className="text-black/50 font-medium">{date && capitalize(dayName)}</span>}
          </motion.h2>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          month={month}
          onMonthChange={setMonth}
          locale={hu}
          mode="single"
          selected={date}
          onSelect={(newDate, _, __, event) => {
            newDate ? onChange(newDate) : null;
            event.stopPropagation();
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
