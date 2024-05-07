import { Feast } from "@/models/Feast";
import { normalizeDateForComparison } from "../date";
import { getMovingHolidays } from "./moving";
import {
    allSaints,
    allSoulsDay,
    assumptionOfMary,
    christmas,
    epiphany,
    holyInnocentsDay,
    solemnityOfMary,
} from "./static";

export const getFeasts = (year: number) => {
  return {
    christmas,
    solemnityOfMary,
    epiphany,
    /* feastOfAnnunciation, */
    assumptionOfMary,
    allSaints,
    allSoulsDay,
    holyInnocentsDay,
    ...getMovingHolidays(year),
  };
};

export const getNextFeast = (givenDate: Date): Feast => {
  const feasts = Object.values(getFeasts(givenDate.getFullYear())).filter(
    (feast) => normalizeDateForComparison(feast.date) >= normalizeDateForComparison(givenDate)
  );

  if (feasts.length === 0) {
    return solemnityOfMary;
  }

  feasts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return feasts[0];
};
