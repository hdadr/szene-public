import { Combobox, Option } from "@/components/combobox";
import { Chirho } from "@/components/svg-icons";
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
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { AgeGroupTypes, LanguageTypes, MusicTypes } from "@/store/slices/masses/types";
import { motion } from "framer-motion";
import { Plus, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { languageOptions } from "../data/languageOptions";
import { AgeGroupSelector } from "./age-group-selector";
import { MusicTypeSelector } from "./music-type-selector";

export type FilterState = {
  musicTypes: MusicTypes;
  ageGroups: AgeGroupTypes;
  greekCatholicMass: boolean;
  includeIgeliturgia: boolean;
  languages: LanguageTypes;
};

type Props = {
  musicTypes: MusicTypes;
  ageGroups: AgeGroupTypes;
  greekCatholicMass: boolean;
  includeIgeliturgia: boolean;
  languages: LanguageTypes;
  onValueChange: (newValue: FilterState) => void;
};

export const MoreFilters = (props: Props) => {
  const [filters, setFilters] = useState<FilterState>({ ...props });

  useEffect(() => {
    const { musicTypes, ageGroups, greekCatholicMass, includeIgeliturgia, languages } = props;
    setFilters((prevFilters) => ({
      ...prevFilters,
      musicTypes,
      ageGroups,
      greekCatholicMass,
      includeIgeliturgia,
      languages,
    }));
  }, [props]);

  const initialSelectedLanguageOptions = props.languages.map((lang) =>
    languageOptions.find((option) => lang === option.value)
  ) as Option[];

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex flex-col w-full self-end items-center  text-purple-800 cursor-pointer">
          <motion.div
            className="flex self-end items-center mr-2  text-sm font-medium bg-white/90 rounded-2xl px-1.5 py-0.5 "
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 1 }}
            style={{ viewTransitionName: "more" }}>
            További feltételek <Plus className="ml-1" size={14} strokeWidth={2.5} />
          </motion.div>
        </div>
      </DrawerTrigger>

      <DrawerContent className="rounded-2xl bg-white p-5">
        <DrawerHeader>
          <DrawerTitle className="mb-6 pt-2 text-purple-700" style={{ viewTransitionName: "more" }}>
            További feltételek
          </DrawerTitle>
        </DrawerHeader>
        <Separator className="mb-4" />

        <div className="flex items-center  w-full">
          <span className="text-sm font-semibold pr-4 text-gray-600">Zene</span>
          <MusicTypeSelector
            value={filters.musicTypes}
            onValueChange={(newValue) => setFilters((prevFilters) => ({ ...prevFilters, musicTypes: newValue }))}
          />
        </div>
        <Separator className="mt-4 mb-4" />

        <div className="flex items-center w-full">
          <span className="text-sm font-semibold pr-4 text-gray-600">Korosztály</span>
          <AgeGroupSelector
            value={filters.ageGroups}
            onValueChange={(newValue) => setFilters((prevFilters) => ({ ...prevFilters, ageGroups: newValue }))}
          />
        </div>
        <Separator className="mt-4 mb-4" />

        <div className="flex items-center  w-full">
          <span className="text-sm font-semibold pr-4 text-gray-600">Egyéb</span>
          <Toggle
            pressed={filters.greekCatholicMass}
            onPressedChange={(newValue) =>
              setFilters((prevFilters) => ({ ...prevFilters, greekCatholicMass: newValue }))
            }
            className={`  text-xs rounded-2xl mr-4 border
                              hover:data-[state=off]:text-muted-foreground
                              hover:data-[state=off]:bg-transparent
                              data-[state=off]:text-muted-foreground
                              data-[state=on]:shadow-sm
                            data-[state=on]:bg-purple-50
                            `}>
            <Chirho className="w-6 pr-2" /> Görögkatolikus
          </Toggle>

          <Toggle
            pressed={filters.includeIgeliturgia}
            onPressedChange={(newValue) =>
              setFilters((prevFilters) => ({ ...prevFilters, includeIgeliturgia: newValue }))
            }
            defaultPressed
            className={`  text-xs rounded-2xl border
                        hover:data-[state=off]:text-muted-foreground
                        hover:data-[state=off]:bg-transparent
                        data-[state=off]:text-muted-foreground
                        data-[state=on]:shadow-sm
                        data-[state=on]:bg-purple-50
                      `}>
            Igeliturgia is
          </Toggle>
        </div>

        <Separator className="mt-4 mb-4" />

        <div className="max-h-[180px] overflow-y-auto">
          <Combobox
            title={"Nyelvek"}
            options={languageOptions}
            initialSelectedOptions={initialSelectedLanguageOptions}
            onChange={(options) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                languages: options.map((option) => option.value) as LanguageTypes,
              }))
            }
            emptySelectionDefault={languageOptions[0]}
          />
        </div>
        <Separator className="mt-4 mb-4" />

        <DrawerFooter className="items-end">
          <DrawerClose asChild>
            <Button
              onClick={() => props.onValueChange(filters)}
              className={`flex items-center border px-3 py-2 rounded-2xl shadow-sm font-medium
                        bg-accent-foreground text-background/85 text-sm`}>
              <Save className="mr-2" size={18} /> Mentés
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
