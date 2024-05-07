import { Period } from "@/models/Feast";
import { calculateEasterDate } from "./easter";

export function getAdventPeriod(year: number): Period {
  const date = new Date(year, 11, 25);
  let sundays = 0;
  while (sundays < 4) {
    date.setDate(date.getDate() - 1);
    if (date.getDay() === 0) {
      sundays++;
    }
  }
  return { name: "Adventi időszak", startDate: date, endDate: new Date(year, 11, 24), colorScheme: "red" };
}

export function getLentPeriod(year: number): Period {
  const easterSunday = calculateEasterDate(year);
  const ashWednesday = new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() - 46);
  return {
    name: "Nagyböjti időszak",
    startDate: ashWednesday,
    endDate: new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() - 1),
    colorScheme: "purple",
  };
}

export function getEasterPeriod(year: number): Period {
  const easterSunday = calculateEasterDate(year);
  const pentecost = new Date(easterSunday);
  pentecost.setDate(easterSunday.getDate() + 49);
  return {
    name: "Húsvéti időszak",
    startDate: easterSunday,
    endDate: pentecost,
    colorScheme: "purple",
  };
}
