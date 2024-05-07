import { BottomPanel } from "@/components/bottom-panel";
import { HeaderContainer } from "@/components/header-container";
import { TitleBar } from "@/components/title-bar";
import { HomepageSelector } from "@/Pages/Settings/components/homepage-selector";
import { ThemeSelector } from "@/Pages/Settings/components/theme-selector";

export const SettingsPage = () => {
  return (
    <>
      <HeaderContainer>
        <TitleBar title="Beállítások" />
      </HeaderContainer>
      
      <div className="mt-6 flex flex-col w-[95%] pb-6 rounded-2xl justify-start border border-gray-200 shadow ">
        <div className="flex items-center w-full p-8">
          <span className="font-semibold pr-4 text-gray-600">Téma</span>
          <ThemeSelector />
        </div>
        <div className="flex items-center w-full p-8 pt-0">
          <span className="font-semibold pr-4 text-gray-600">Kezdőlap</span>
          <HomepageSelector />
        </div>
      </div>
      <BottomPanel />
    </>
  );
};
