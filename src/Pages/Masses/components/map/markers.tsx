import { Church } from "@/models/Church";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLastOpenedPopupChurchTid } from "@/store/slices/masses";
import { CircleMarker as CircleMarkerType, FeatureGroup as FeatureGroupType } from "leaflet";
import { PersonStanding } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { CircleMarker, FeatureGroup, Popup, useMap } from "react-leaflet";
import { MarkerChurchInfo } from "./marker-church-info";

type Coords = { lat: number; lng: number };
type Props = { churches: Church[]; shouldShowMyLocation?: boolean };

export const Markers = ({ churches, shouldShowMyLocation = false }: Props) => {
  const dispatch = useAppDispatch();
  const markerRefs = useRef(churches.map((church) => ({ ref: React.createRef<CircleMarkerType>(), tid: church.tid })));
  const featureGroupRef = useRef<FeatureGroupType | null>(null);
  const lastOpenedPopupChurchTid = useAppSelector((state: RootState) => state.masses.layout.map.lastOpenedPopupChurchTid);
  const map = useMap();
  const [coords, setCoords] = useState<Coords | null>();

  useEffect(() => {
    if (featureGroupRef.current === null) return;
    map.fitBounds(featureGroupRef.current.getBounds().pad(0.5));
  }, [map, coords?.lat, shouldShowMyLocation]);

  useEffect(() => {
    let watchID: number | undefined;

    if (shouldShowMyLocation && navigator.geolocation) {
      watchID = navigator.geolocation.watchPosition(
        (position) => setCoords({ lat: position.coords.latitude, lng: position.coords.longitude }),
        console.log,
        { timeout: 5000 }
      );
    }

    return () => {
      if (watchID) navigator.geolocation.clearWatch(watchID);
    };
  }, [shouldShowMyLocation]);

  useEffect(() => {
    const marker = markerRefs.current.find(({ tid }) => lastOpenedPopupChurchTid === tid);
    marker?.ref.current?.openPopup();
  }, [lastOpenedPopupChurchTid]);

  return (
    <FeatureGroup ref={featureGroupRef}>
      {shouldShowMyLocation && coords?.lat && (
        <CircleMarker color="#fcd34d" radius={10} fillOpacity={0.6} center={[coords.lat ?? 0, coords.lng ?? 0]}>
          <Popup>
            <div className="flex flex-col items-center">
              <PersonStanding className="mb-2" />
              <span className="text-black/50 font-semibold">Itt állok</span>
            </div>
          </Popup>
        </CircleMarker>
      )}

      {churches.map((church, index) => {
        return (
          <CircleMarker
            ref={markerRefs.current[index].ref}
            eventHandlers={{ click: () => dispatch(setLastOpenedPopupChurchTid(church.tid)) }}
            color="#9333ea"
            radius={10}
            fillOpacity={0.6}
            key={church.tid}
            center={[church.lat ?? 0, church.lng ?? 0]}>
            <Popup className="min-w-[100px]">
              <MarkerChurchInfo church={church} />
            </Popup>
          </CircleMarker>
        );
      })}
    </FeatureGroup>
  );
};
