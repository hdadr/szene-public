import { apiUrl } from "@/config";

export async function getChurchesByCity(city: string) {
  try {
    const response = await fetch(`${apiUrl}/churches?city=${encodeURIComponent(city)}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
}
