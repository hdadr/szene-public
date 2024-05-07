import { getChurchesByCity as getChurchesByCityLocalhost } from "@/Pages/Masses/data/localhost";
import { getChurchesByCity as getChurchesByCitySupabase } from "@/Pages/Masses/data/supabase";

export const fetchChurchesByCity = (city: string) =>
  import.meta.env.MODE === "development" ? getChurchesByCityLocalhost(city) : getChurchesByCitySupabase(city);
