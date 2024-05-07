import { Chip } from "@/components/chip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatMonthDay, getDayNameByNumber, isDateInRange } from "@/lib/date";
import { Mass } from "@/models/Mass";
import groupBy from "lodash.groupby";
import { formatTime, sortByTime } from "../lib/masses";

function getActivePeriod(groupedMasses: Record<string, Mass[]>, date: number) {
  for (const [idoszak, masses] of Object.entries(groupedMasses)) {
    const { datumtol, datumig } = masses[0];
    if (datumtol && datumig && isDateInRange(date, datumtol, datumig)) {
      return idoszak;
    }
  }
}

const capitalize = (inputString: string): string => {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};

type Props = {
  masses?: Mass[];
};

//TODO take into account the wight of the mass that shown for the day
export function MassTimeTable({ masses }: Props) {
  const groupedMassesByPeriod = groupBy(masses, "idoszak");
  const groupedMassesByDay = Object.entries(groupedMassesByPeriod).map(([idoszak, masses]) => {
    const sortedByTime = (masses as Mass[]).sort(sortByTime);
    const groupedMasses = groupBy(sortedByTime, "nap") as Record<string, Mass[]>;
    return { period: idoszak, groupedMasses };
  });
  const today = new Date();
  const activePeriod = getActivePeriod(groupedMassesByPeriod, formatMonthDay(today));
  const dayOfWeek = ((today.getDay() + 6) % 7) + 1;

  return (
    <Tabs defaultValue={activePeriod} className="border shadow-sm bg-white rounded-2xl p-1">
      <TabsList className="flex flex-wrap bg-white pb-8">
        {groupedMassesByDay.map(({ period }) => (
          <TabsTrigger key={period} value={period}>
            {capitalize(period)}
          </TabsTrigger>
        ))}
      </TabsList>
      {groupedMassesByDay.map(({ period, groupedMasses }) => (
        <TabsContent key={period} value={period} className="pt-6 px-2 pb-2">
          <div className="flex flex-col items-start gap-1 text-sm text-gray-500">
            {Object.entries(groupedMasses).map(([dayNumber, masses]) => {
              return (
                <div key={dayNumber} className="flex items-center flex-wrap max-w-[320px] min-w-[250px] gap-2">
                  <span className={dayOfWeek === +dayNumber ? "font-semibold text-foreground" : ""}>
                    {getDayNameByNumber(+dayNumber)}
                  </span>
                  {masses.map((mass) => {
                    return (
                      <Chip
                        key={mass.mid}
                        className="text-xs bg-white"
                        variant={
                          mass.ido &&
                          dayOfWeek === +dayNumber &&
                          activePeriod === period &&
                          formatTime(mass.ido) <
                            today.toLocaleTimeString(["hu-HU"], { hour: "2-digit", minute: "2-digit" })
                            ? "muted"
                            : "default"
                        }>
                        {mass.ido && formatTime(mass.ido)}
                      </Chip>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
