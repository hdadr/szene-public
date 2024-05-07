import { Church } from "@/models/Church";

export type Tab = "search-result" | "church-history" | "bookmarked-churches";
export type MusicTypes = ("cs" | "g" | "na")[]; //cs: csendes, g: gitáros, na: meghatározatlan
export type AgeGroupTypes = ("ifi" | "d" | "csal" | "na")[]; //ifi: ifjúsági, d: diák, csal: családos, na: -||-
export type LanguageTypes = ("0" | "hu" | "en" | "de" | "it" | "fr" | "va" | "gr" | "sk" | "hr" | "pl" | "si")[]; //ifi: ifjúsági, d: diák, csal: családos, na: -||-

export type FormState = {
  city: string;
  churchName: string;
  date: string | undefined; //date.toISOString()
  musicTypes: MusicTypes;
  ageGroups: AgeGroupTypes;
  greekCatholicMass: boolean;
  includeIgeliturgia: boolean; //TODO: no-hunglish. english name for igeliturgia?
  languages: LanguageTypes;
};

export type Layout = {
  searchFormVisible: boolean;
  activeTab: Tab;
  map: {
    open: boolean;
    lastOpenedPopupChurchTid?: number;
  };
  scrollPosition?: number;
};
export type ChurchStorePlace = "history" | "bookmark" | "map";

export type MassesState = {
  form: FormState;
  selectedChurch: Church | undefined;
  selectedChurchesForMap: Church[];
  searchResultChurches: Church[];
  bookmarkedChurches: Church[];
  churchHistory: Church[];
  layout: Layout;
  loading?: boolean;
};
