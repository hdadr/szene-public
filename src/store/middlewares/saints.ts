import { keys } from "@/lib/localstorage";
import { getSeenSaintsIDs } from "@/lib/seenSaintsIDs";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { setSelectedSaint } from "../slices/saints";

export const saintsMiddleware = createListenerMiddleware();

saintsMiddleware.startListening({
  actionCreator: setSelectedSaint,
  effect: async (action) => {
    const seenSaintsIDs = getSeenSaintsIDs();

    const alreadyStored = seenSaintsIDs.includes(action.payload.saint.id);
    if (alreadyStored) return;

    localStorage.setItem(keys.saints.seenSaints, JSON.stringify([...seenSaintsIDs, action.payload.saint.id]));
  },
});
