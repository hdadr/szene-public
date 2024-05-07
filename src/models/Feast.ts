export type ColorScheme = "blue" | "red" | "gold" | "purple" | "green";

export interface Feast {
  id: number;
  name: string;
  date: Date;
  additionalInfo?: string[];
  colorScheme?: ColorScheme;
}

export interface Period {
  name: string;
  startDate: Date;
  endDate: Date;
  colorScheme: ColorScheme;
}
