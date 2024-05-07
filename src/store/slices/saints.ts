import { getSeenSaintsIDs } from "@/lib/seenSaintsIDs";
import { Saint } from "@/models/Saint";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SaintState = {
  datetime: number | undefined;
  selectedSaint: Saint | undefined;
  seenSaintsIDs: string[];
};

const initialState: SaintState = {
  datetime: undefined,
  selectedSaint: undefined,
  seenSaintsIDs: getSeenSaintsIDs(),
};

export const saintSlice = createSlice({
  name: "saints",
  initialState,
  reducers: {
    setSelectedSaint: (state, action: PayloadAction<{ saint: Saint; datetime: number }>) => {
      state.selectedSaint = action.payload.saint;
      state.datetime = action.payload.datetime;
      state.seenSaintsIDs.push(action.payload.saint.id)
    },
  },
});

export const { setSelectedSaint } = saintSlice.actions;
export default saintSlice.reducer;
