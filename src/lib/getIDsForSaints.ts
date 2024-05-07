import saintIDsByDate from "@/assets/saintIDsByDate.json";

// default value is for testing only
export function getIDsForSaints(targetDate: string = "0101") {
  return saintIDsByDate.find((data) => data.date === targetDate)?.ids || [];
}
