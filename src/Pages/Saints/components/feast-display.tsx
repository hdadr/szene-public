import { calculateDaysDifference, formatMonthDay, isDateInRange } from "@/lib/date";
import { getNextFeast } from "@/lib/feasts";
import { getAdventPeriod, getLentPeriod } from "@/lib/feasts/periods";
import { cn } from "@/lib/utils";
import { ColorScheme, Period } from "@/models/Feast";
import { useEffect, useMemo, useState } from "react";

export type FeastType = { visible: boolean; type?: "feast-day" | "feast-period" };

type Props = {
  date: Date;
  onFeastVisibilityChange: (feastType: FeastType) => void;
};

export const FeastDisplay = ({ date, onFeastVisibilityChange }: Props) => {
  const nextFeast = useMemo(() => getNextFeast(date), [date]);
  const daysAwayFromNextFeast = useMemo(() => calculateDaysDifference(nextFeast.date, date), [date, nextFeast.date]);
  const advent = useMemo(() => getAdventPeriod(date.getFullYear()), [date]);
  const lent = useMemo(() => getLentPeriod(date.getFullYear()), [date]);
  const [feastType, setFeastType] = useState<FeastType>({ visible: false });
  const [period, setPeriod] = useState<Period | undefined>(undefined);

  useEffect(() => {
    onFeastVisibilityChange(feastType);
  }, [feastType, onFeastVisibilityChange]);

  useEffect(() => {
    const isPalmSundayOrGoodFriday = nextFeast.name === "Virágvasárnap" || nextFeast.name === "Nagypéntek";
    const isLentPeriod =
      (nextFeast.name === "Hamvazószerda" && daysAwayFromNextFeast === 0) ||
      (nextFeast.name === "Húsvétvasárnap" && daysAwayFromNextFeast > 0);
    const isAdventPeriod =
      nextFeast.name === "Karácsony" &&
      isDateInRange(formatMonthDay(date), formatMonthDay(advent.startDate), formatMonthDay(advent.endDate));
    let activePeriod: Period | undefined = undefined;

    if (isLentPeriod || (isPalmSundayOrGoodFriday && daysAwayFromNextFeast > 0)) {
      activePeriod = lent;
      setFeastType({ visible: true });
    } else if (isAdventPeriod) {
      activePeriod = advent;
      setFeastType({ visible: true });
    }

    const feastType: FeastType =
      daysAwayFromNextFeast === 0 ? { visible: true, type: "feast-day" } : { visible: false };
    const feastPeriod: FeastType =
      activePeriod !== undefined ? { visible: true, type: "feast-period" } : { visible: false };

    setFeastType(feastType.visible ? feastType : feastPeriod);
    setPeriod(activePeriod);
  }, [advent, daysAwayFromNextFeast, lent, nextFeast.name, date, setFeastType]);

  const glowColor = getGlowColor(feastType.type === "feast-day" ? nextFeast.colorScheme : period?.colorScheme);

  return (
    <>
      {feastType.visible && (
        <div className={cn("flex justify-center w-full rounded-2xl border-2 shadow", glowColor)}>
          <div className="flex flex-col items-center justify-center leading-none tracking-tight pt-2">
            <span className={`${daysAwayFromNextFeast === 0 ? "mb-1" : "pb-2"} text-black/85 text-lg font-medium`}>
              {daysAwayFromNextFeast === 0 ? nextFeast.name : period?.name}
            </span>

            {daysAwayFromNextFeast === 0 && (
              <>
                {nextFeast.additionalInfo?.map((info, index) => (
                  <span
                    key={info}
                    className={`${nextFeast.additionalInfo?.length === index+1 ? "mb-3" : ""} text-xs text-black/60`}>
                    {info}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

function getGlowColor(colorScheme?: ColorScheme): string {
  switch (colorScheme) {
    case "blue":
      return "border-blue-400 shadow-blue-300";
    case "red":
      return "border-red-500 shadow-red-400";
    case "gold":
      return "border-amber-300 shadow-amber-200";
    case "purple":
      return "border-purple-400 shadow-purple-300";
    case "green":
      return "border-green-400 shadow-green-300";
    default:
      return "";
  }
}
