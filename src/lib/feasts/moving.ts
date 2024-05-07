import { Feast } from "@/models/Feast";
import { formatMonthDay, normalizeDateForComparison } from "../date";
import { calculateEasterDate } from "./easter";

export function getMovingHolidays(year: number) {
  const easterSundayDate = calculateEasterDate(year);
  const easterSunday: Feast = {
    id: easterSundayDate.getMonth() * 100 + easterSundayDate.getDate(),
    name: "Húsvétvasárnap",
    date: easterSundayDate,
    additionalInfo: ["Jézus feltámadása"],
    colorScheme: "gold",
  };

  const ashWednesdayDate = new Date(easterSundayDate);
  ashWednesdayDate.setDate(easterSundayDate.getDate() - 46);
  const ashWednesday: Feast = {
    id: formatMonthDay(ashWednesdayDate),
    name: "Hamvazószerda",
    date: ashWednesdayDate,
    additionalInfo: ["Nagyböjt kezdete"],
    colorScheme: "purple",
  };

  const palmSundayDate = new Date(easterSundayDate);
  palmSundayDate.setDate(easterSundayDate.getDate() - 7);
  const palmSunday: Feast = {
    id: formatMonthDay(palmSundayDate),
    name: "Virágvasárnap",
    date: palmSundayDate,
    additionalInfo: ["Nagyhét kezdete.", "Jézus bevonulása Jeruzsálembe.", "(Nagyböjti időszak)"],
    colorScheme: "purple",
  };

  const holyMondayDate = new Date(easterSundayDate);
  holyMondayDate.setDate(easterSundayDate.getDate() - 6);
  const holyMonday: Feast = {
    id: formatMonthDay(holyMondayDate),
    name: "Nagyhétfő",
    date: holyMondayDate,
    additionalInfo: ["Nagyhét", "(Nagyböjti időszak)"],
    colorScheme: "purple",
  };

  const holyTuesdayDate = new Date(easterSundayDate);
  holyTuesdayDate.setDate(easterSundayDate.getDate() - 5);
  const holyTuesday: Feast = {
    id: formatMonthDay(holyTuesdayDate),
    name: "Nagypéntek",
    date: holyTuesdayDate,
    additionalInfo: ["Nagyhét", "(Nagyböjti időszak)"],
    colorScheme: "purple",
  };

  const holyWednesdayDate = new Date(easterSundayDate);
  holyWednesdayDate.setDate(easterSundayDate.getDate() - 4);
  const holyWednesday: Feast = {
    id: formatMonthDay(holyWednesdayDate),
    name: "Nagyszerda",
    date: holyWednesdayDate,
    additionalInfo: ["Nagyhét", "(Nagyböjti időszak)"],
    colorScheme: "purple",
  };

  const holyThursdayDate = new Date(easterSundayDate);
  holyThursdayDate.setDate(easterSundayDate.getDate() - 3);
  const holyThursday: Feast = {
    id: formatMonthDay(holyThursdayDate),
    name: "Nagycsütörtök",
    date: holyThursdayDate,
    additionalInfo: ["Húsvéti szent három nap", "Nagyhét", "(Nagyböjti időszak)"],
    colorScheme: "purple",
  };

  const goodFridayDate = new Date(easterSundayDate);
  goodFridayDate.setDate(easterSundayDate.getDate() - 2);
  const goodFriday: Feast = {
    id: formatMonthDay(goodFridayDate),
    name: "Nagypéntek",
    date: goodFridayDate,
    additionalInfo: ["Húsvéti szent három nap", "Nagyhét", "(Nagyböjti időszak)"],
    colorScheme: "purple",
  };

  const holySaturdayDate = new Date(easterSundayDate);
  holySaturdayDate.setDate(easterSundayDate.getDate() - 1);
  const holySaturday: Feast = {
    id: formatMonthDay(holySaturdayDate),
    name: "Nagyszombat",
    date: holySaturdayDate,
    additionalInfo: ["Húsvéti szent három nap", "Nagyhét", "(Nagyböjti időszak)"],
    colorScheme: "purple",
  };

  const ascensionDayDate = new Date(easterSundayDate);
  ascensionDayDate.setDate(easterSundayDate.getDate() + 39);
  const ascensionDay: Feast = {
    id: formatMonthDay(ascensionDayDate),
    name: "Urunk mennybemenetele",
    date: ascensionDayDate,
    additionalInfo: ["Ascensio Domini"],
    colorScheme: "green",
  };

  const pentecostDate = new Date(easterSundayDate);
  pentecostDate.setDate(easterSundayDate.getDate() + 49);
  const pentecost: Feast = {
    id: formatMonthDay(pentecostDate),
    name: "Pünkösd",
    date: pentecostDate,
    additionalInfo: ["Szentlélek kiáradása"],
    colorScheme: "red",
  };

  const corpusChristiDate = new Date(easterSundayDate);
  corpusChristiDate.setDate(easterSundayDate.getDate() + 60);
  const corpusChristi: Feast = {
    id: formatMonthDay(corpusChristiDate),
    name: "Úrnapja",
    date: corpusChristiDate,
    additionalInfo: ["Úr Szent Testének és Szent Vérének ünnepe"],
    colorScheme: "green",
  };

  const annunciationDate = new Date(calculateAnnunciationDate(palmSundayDate, easterSundayDate, year));
  const feastOfAnnunciation: Feast = {
    id: 325,
    name: "Gyümölcsoltó Boldogasszony",
    date: annunciationDate,
    additionalInfo: ["Jézus születésének hírüladása", "Annuntiatio Beatae Mariae Virginis"],
    colorScheme: "blue",
  };

  return {
    feastOfAnnunciation,
    ashWednesday,
    palmSunday,
    holyMonday,
    holyTuesday,
    holyWednesday,
    holyThursday,
    goodFriday,
    holySaturday,
    easterSunday,
    pentecost,
    ascensionDay,
    corpusChristi,
  };
}

export function calculateAnnunciationDate(palmSunday: Date, easter: Date, year: number) {
  const normalizedPalmSundayDate = normalizeDateForComparison(palmSunday);
  const normalizedEasterSundayDate = normalizeDateForComparison(easter);

  const normalizedAnnunciationDate = normalizeDateForComparison(new Date(year, 2, 25));

  if (
    normalizedAnnunciationDate >= normalizedPalmSundayDate &&
    normalizedAnnunciationDate <= normalizedEasterSundayDate
  ) {
    const secondSundayAfterEaster = new Date(easter);
    secondSundayAfterEaster.setDate(easter.getDate() + 7);
    const annunciation = new Date(secondSundayAfterEaster);
    annunciation.setDate(secondSundayAfterEaster.getDate() + 1);
    return annunciation;
  }

  return new Date(year, 2, 25);
}
