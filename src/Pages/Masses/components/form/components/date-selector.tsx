import { DatePopover } from "@/components/date-popover";
import { formatDateForDisplay } from "@/lib/date";
import { blinkVariant } from "@/lib/framerProps";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  value: Date | undefined;
  onValueChage: (date: Date | undefined) => void;
};

export const DateSelector = ({ value, onValueChage }: Props) => {
  const [date, setDate] = useState<Date | undefined>(value);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setDate(value);
    if (value === undefined) setSelected(false);
  }, [value]);

  return (
    <div className="flex self-start items-center mb-4 h-8">
      <div
        onClick={() => {
          if (!selected) {
            setSelected(true);
            const today = new Date();
            setDate(today);
            onValueChage(today);
          }
        }}>
        <DatePopover
          className={`border text-xs font-medium ${!selected && "text-muted-foreground"}`}
          text="Dátum:"
          date={date}
          onChange={(newDate) => {
            setDate(newDate);
            selected && onValueChage(newDate);
          }}
        />
      </div>
      <div>
        {selected ? (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, transition: { duration: 1 } }}
            className="flex  ml-2 py-1.5 px-3 text-xs font-medium border shadow-sm bg-purple-50/95 rounded-2xl">
            <motion.h2
              key={date && date.getTime()}
              variants={blinkVariant}
              initial="hidden"
              animate="show"
              exit="hidden">
              {date && formatDateForDisplay(date)}
            </motion.h2>
            <X
              onClick={() => {
                setDate(undefined);
                onValueChage(undefined);
                setSelected(false);
              }}
              className="ml-1.5 self-center cursor-pointer hover:text-gray-500 text-zinc-600"
              size={14}
            />
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};
