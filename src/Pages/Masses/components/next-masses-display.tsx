import { Chip } from "@/components/chip";
import { getDayNameByNumber } from "@/lib/date";
import { cn } from "@/lib/utils";
import { Church } from "@/models/Church";
import { formatTime, getMassesForSelectedDate, getNextMassesAfterDate } from "../lib/masses";

export const NextMassesDisplay = ({ church, className }: { church: Church, className?: string }) => {
  const today = new Date();
  const massesForToday = getMassesForSelectedDate(church.misek, today);
  const nextMasses = getNextMassesAfterDate(church, today);
  //TODO: if there are no more upcoming mass for the day, show the next upcoming?
  
  return (
    <div className={cn("flex items-center",className)}>
      {massesForToday[0]?.nap ? (
        <span className="mr-1"> Ma: </span>
      ) : (
        <span className="mr-1">{nextMasses[0]?.nap && getDayNameByNumber(nextMasses[0]?.nap) + ":"} </span>
      )}

      <span className="flex flex-wrap gap-1">
        {massesForToday.length > 0
          ? massesForToday.map((mass) => {
              return (
                <Chip
                  key={mass.mid}
                  variant={
                    mass.ido &&
                    formatTime(mass.ido) < today.toLocaleTimeString(["hu-HU"], { hour: "2-digit", minute: "2-digit" })
                      ? "muted"
                      : "default"
                  }>
                  {mass.ido && formatTime(mass.ido)}
                </Chip>
              );
            })
          : nextMasses.map((mass) => {
              return <Chip key={mass.mid}>{mass.ido && formatTime(mass.ido)}</Chip>;
            })}
      </span>
    </div>
  );
};
