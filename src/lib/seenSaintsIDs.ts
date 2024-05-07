import { keys } from "./localstorage";

export function getSeenSaintsIDs(): string[] {
  const seenSaintsIDs = localStorage.getItem(keys.saints.seenSaints);
  return seenSaintsIDs ? JSON.parse(seenSaintsIDs) : [];
}
