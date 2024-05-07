import { keys } from "@/lib/localstorage";
import { Church } from "@/models/Church";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from "..";
import { addChurchTo, removeChurchFrom } from "../slices/masses";
import { ChurchStorePlace } from "../slices/masses/types";

export const massesMiddleware = createListenerMiddleware();

//TODO: const historyMaxLength = 20; ?
const placesForStore: ChurchStorePlace[] = ["history", "bookmark"];


massesMiddleware.startListening({
  actionCreator: addChurchTo,
  effect: async (action) => {
    const { place, church } = action.payload;
    if (!placesForStore.includes(place)) return;

    const target = place === "history" ? "churchHistory" : "bookmarkedChurches";
    const churches: Church[] = JSON.parse(localStorage.getItem(keys.masses[target]) || "[]");
    const alreadyStored = churches.some((c) => c.tid === church.tid);
    if (alreadyStored) return;

    localStorage.setItem(keys.masses[target], JSON.stringify([action.payload.church, ...churches]));
  },
});

massesMiddleware.startListening({
  actionCreator: removeChurchFrom,
  effect: async (action, listenerApi) => {
    const { place, church } = action.payload;
    if (!placesForStore.includes(place)) return;

    const target = place === "history" ? "churchHistory" : "bookmarkedChurches";
    const churches: Church[] = (listenerApi.getState() as RootState).masses[target];
    const updatedChurches = churches.filter((c) => c.tid !== church.tid);
    localStorage.setItem(keys.masses[target], JSON.stringify(updatedChurches));
  },
});
