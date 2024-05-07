import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

const selectMassesState = (state: RootState) => state.masses;

export const selectAreChurchesSelectedForMap = createSelector(
    selectMassesState,
    (massesState) => massesState.selectedChurchesForMap.length > 0
  );