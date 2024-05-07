import { Bible, Psalm } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { BookOpen, Church, Settings, Users } from "lucide-react";
import { MainPanel } from "./main-panel";
import { PanelButton } from "./panel-button";
import { SecondaryPanel } from "./secondary-panel";
import { useActive } from "./useActive";

export const BottomPanel = () => {
  const iconClasses = (active: boolean, isSVG = false) =>
    `"w-6 h-5 mb-1" ${
      active ? (isSVG ? "fill-purple-500" : "text-purple-500 dark:text-purple-300") : "text-gray-500 dark:text-gray-400"
    }`;

  return (
    <div className="flex flex-col items-center z-40">
      {/* placeholder div, to bring back up the content from behind the panel */}
      <div className="min-h-[68px] w-[95%] rounded-2xl">{"\u00A0"}</div>

      <div className="flex flex-col border w-full min-[540px]:w-[540px] rounded-t-2xl items-center fixed bottom-[-2px] z-50 h-[68px] bg-white ">
        <div className="h-full flex items-center">
          <MainPanel>
            <PanelButton linkTo="/masses" text="Misék" active={useActive(["/masses"])}>
              <Church className={iconClasses(useActive(["/masses"]))} />
            </PanelButton>

            <PanelButton linkTo="/saints" text="Szentek" active={useActive(["/saints"])}>
              <Users className={iconClasses(useActive(["/saints"]))} />
            </PanelButton>

            <PanelButton linkTo="/words" text="Ige" active={useActive(["/words"])}>
              <BookOpen className={iconClasses(useActive(["/words"]))} />
            </PanelButton>

            <SecondaryPanel>
              <PanelButton linkTo="/settings" text="Beállítások" active={useActive(["/settings"])}>
                <Settings className={iconClasses(useActive(["/settings"]))} />
              </PanelButton>

              <PanelButton linkTo="/bible" text="Szentírás" active={useActive(["/bible"])}>
                <Bible className={cn(iconClasses(useActive(["/bible"]), true), "w-7 h-7")} />
              </PanelButton>

              <PanelButton linkTo="/psalm" text="Zsolozsma" active={useActive(["/psalm"])}>
                <Psalm className={cn(iconClasses(useActive(["/psalm"]), true), "w-7 h-7")} />
              </PanelButton>
            </SecondaryPanel>
          </MainPanel>
        </div>
      </div>
    </div>
  );
};
