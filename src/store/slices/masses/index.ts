import { keys } from "@/lib/localstorage";
import { Church } from "@/models/Church";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChurchStorePlace, FormState, MassesState, Tab } from "./types";

const initialFormState: FormState = {
  city: "",
  churchName: "",
  date: undefined,
  musicTypes: ["cs", "g", "na"],
  ageGroups: ["ifi", "d", "csal", "na"],
  greekCatholicMass: false,
  includeIgeliturgia: true,
  languages: ["hu"],
};

const bookmarkedChurches = JSON.parse(localStorage.getItem(keys.masses.bookmarkedChurches) || "[]") as Church[];
const churchHistory = JSON.parse(localStorage.getItem(keys.masses.churchHistory) || "[]");
const initialActiveTab = (): Tab => {
  if (bookmarkedChurches.length > 0) return "bookmarked-churches";
  if (churchHistory.length > 0) return "church-history";
  return "search-result";
};

const initialState: MassesState = {
  form: initialFormState,
  selectedChurch: undefined,
  selectedChurchesForMap: [],
  searchResultChurches: [],
  bookmarkedChurches,
  churchHistory,
  layout: { searchFormVisible: true, activeTab: initialActiveTab(), map: { open: false } },
  loading: false,
};

export const MassesSlice = createSlice({
  name: "masses",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<{ form: FormState }>) => {
      state.form = action.payload.form;
    },
    resetForm: (state) => {
      state.form = initialFormState;
    },
    setSelectedChurch: (state, action: PayloadAction<Church>) => {
      state.selectedChurch = action.payload;
    },
    setSearchResult: (state, action: PayloadAction<Church[]>) => {
      state.searchResultChurches = action.payload;
    },
    setSearchFormVisible: (state, action: PayloadAction<boolean>) => {
      state.layout.searchFormVisible = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<Tab>) => {
      state.layout.activeTab = action.payload;
    },
    setScrollPosition: (state, action: PayloadAction<number>) => {
      state.layout.scrollPosition = action.payload;
    },
    setMapOpen: (state, action: PayloadAction<boolean>) => {
      state.layout.map.open = action.payload;
    },
    setLastOpenedPopupChurchTid: (state, action: PayloadAction<number | undefined>) => {
      state.layout.map.lastOpenedPopupChurchTid = action.payload;
    },
    addChurchTo: (state, action: PayloadAction<{ place: ChurchStorePlace; church: Church }>) => {
      const { place, church } = action.payload;
      const target =
        place === "history" ? "churchHistory" : place === "bookmark" ? "bookmarkedChurches" : "selectedChurchesForMap";
      const alreadyStored = state[target].some((item) => item.tid === church.tid);
      if (!alreadyStored) {
        state[target] = [church, ...state[target]];
      }
    },
    removeChurchFrom: (state, action: PayloadAction<{ place: ChurchStorePlace; church: Church }>) => {
      const { place, church } = action.payload;
      const target =
        place === "history" ? "churchHistory" : place === "bookmark" ? "bookmarkedChurches" : "selectedChurchesForMap";
      const updatedChurchHistory = state[target].filter((c) => c.tid !== church.tid);
      state[target] = updatedChurchHistory;
    },
    unselectChurchesForMap: (state) => {
      state.selectedChurchesForMap = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setForm,
  resetForm,
  setSelectedChurch,
  setSearchResult,
  setSearchFormVisible,
  setActiveTab,
  removeChurchFrom,
  addChurchTo,
  unselectChurchesForMap,
  setLoading,
  setScrollPosition,
  setMapOpen,
  setLastOpenedPopupChurchTid,
} = MassesSlice.actions;
export default MassesSlice.reducer;
