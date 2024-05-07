import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_API_KEY);

export async function getChurchesByCity(city: string) {
  const { data, error } = await supabase.from("templomok").select("*, misek (*), kepek (kep)").ilike("varos", `%${city}%`);
  if (error) console.log(error);
  return data;
}
