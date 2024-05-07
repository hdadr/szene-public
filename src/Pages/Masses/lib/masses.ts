import { formatMonthDay, getDayNumber, incrementDateByOneDay, isDateInRange } from "@/lib/date";
import { Church } from "@/models/Church";
import { Mass } from "@/models/Mass";

export const getActiveMasses = (masses: Mass[], date: Date) => {
  return masses.filter((mise) => {
    const { datumtol, datumig } = mise;
    if (!datumtol || !datumig) return false;
    return isDateInRange(formatMonthDay(date), datumtol, datumig);
  });
};

export function sortByTime(a: Mass, b: Mass) {
  if (a.ido && b.ido) {
    return a.ido.localeCompare(b.ido);
  }
  return 0;
}

export const getMassesForSelectedDate = (masses: Mass[], date: Date) => {
  const activeMasses = getActiveMasses(masses, date);
  return activeMasses.filter((mise) => mise.nap === getDayNumber(date)).sort(sortByTime);
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}`;
};

export function getNextMassesAfterDate(church: Church, startDate: Date) {
  let initialDate = incrementDateByOneDay(startDate);
  const maxDaysToSearch = 7;

  for (let daysSearched = 0; daysSearched < maxDaysToSearch; daysSearched++) {
    const massesForDate = getMassesForSelectedDate(church.misek, initialDate);

    if (massesForDate.length > 0) {
      return massesForDate;
    }

    initialDate = incrementDateByOneDay(initialDate);
  }

  return [];
}
