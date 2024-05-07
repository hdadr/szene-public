
export const generateFileNameFromDate = (date: Date) => {
  return date.toISOString().split("T")[0].replaceAll("-", "_") + ".json";
};

export function generateKeyFromDate(date: Date) {
  return generateFileNameFromDate(date).replace(".json", "")
}