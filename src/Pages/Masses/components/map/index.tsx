import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMapOpen } from "@/store/slices/masses";
import { selectAreChurchesSelectedForMap } from "@/store/slices/masses/selectors";
import { AnimatePresence, motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import { MapPinned } from "lucide-react";
import { useState } from "react";
import { AttributionControl, MapContainer, TileLayer } from "react-leaflet";
import { Markers } from "./markers";

export const Map = () => {
  const churches = useAppSelector((state: RootState) => state.masses.selectedChurchesForMap);
  const areChurchesSelectedForMap = useAppSelector(selectAreChurchesSelectedForMap);
  const { open: isMapOpen } = useAppSelector((state: RootState) => state.masses.layout.map);
  const dispatch = useAppDispatch();
  const [showMyLocation, setShowMyLocation] = useState(false);
  //TODO: if user denies location access, inform on the UI that the location access is denied
  //TODO: the site sometimes jumps to the bottom of the page when the drawer closed.

  return (
    <AnimatePresence>
      {areChurchesSelectedForMap && (
        <Drawer open={isMapOpen} onOpenChange={(open) => dispatch(setMapOpen(open))}>
          <DrawerTrigger>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
              exit={{ x: "100%" }}
              className="fixed bottom-[68px] right-0 z-50  gap-1">
              <div className="flex items-center bg-white rounded-2xl py-1 px-2 border shadow-sm font-medium text-xs text-black/90">
                <MapPinned strokeWidth={1.5} className="w-4 mr-1 text-purple-500" />
                Megjelenítés a térképen
              </div>
            </motion.div>
          </DrawerTrigger>

          <DrawerContent
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            className="rounded-2xl bg-white">
            <DrawerHeader>
              <DrawerTitle className=" text-purple-700">Térkép</DrawerTitle>
            </DrawerHeader>

            <div className="w-full h-full px-1" data-vaul-no-drag>
              <MapContainer
                boundsOptions={{
                  paddingBottomRight: [250, 0],
                }}
                center={[churches[0].lat ?? 0, churches[0].lng ?? 0]}
                zoom={15}
                className="w-full h-[500px] rounded-2xl"
                attributionControl={false}>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Markers shouldShowMyLocation={showMyLocation} churches={churches} />
                <AttributionControl position="bottomright" prefix="" />
              </MapContainer>
            </div>

            <div className="flex items-center p-5 gap-2 mt-3">
              <Switch
                checked={showMyLocation}
                onCheckedChange={(c) => setShowMyLocation(c)}
                className="data-[state=checked]:bg-purple-600"
                id="location"
              />
              <Label htmlFor="location" className="text-muted-foreground">
                Lokációm mutatása a térképen
              </Label>
            </div>

            <DrawerFooter className="items-end px-5 mt-3">
              <DrawerClose asChild>
                <Button className="rounded-2xl" variant={"outline"}>
                  Bezárás
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </AnimatePresence>
  );
};
