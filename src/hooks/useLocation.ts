import { useEffect, useState } from "react";

export type Coords = { lat: number; lng: number };

export const useLocation = (timeout?: number) => {
  const [coords, setCoords] = useState<Coords | null>(null);

  useEffect(() => {
    let watchID: number;
    if (navigator && "geolocation" in navigator) {
      watchID = navigator.geolocation.watchPosition(
        (position) => setCoords({ lat: position.coords.latitude, lng: position.coords.longitude }),
        console.log,
        { timeout: timeout ? timeout : 5000 }
      );
    }

    return () => {
      if (watchID) navigator.geolocation.clearWatch(watchID);
    };
  }, []);

  return { coords } as const;
};
