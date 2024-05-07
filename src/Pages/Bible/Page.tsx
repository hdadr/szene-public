import { BottomPanel } from "@/components/bottom-panel";
import { HeaderContainer } from "@/components/header-container";
import { TitleBar } from "@/components/title-bar";

export const BiblePage = () => {
  return (
    <>
      <HeaderContainer>
        <TitleBar title="Szentírás" />
      </HeaderContainer>

      <div className="text-muted-foreground  mt-6">Szentírás olvasása</div>
      <div className="text-muted-foreground text-xs mt-3">A fejlesztése még nem kezdődött el...</div>
      <BottomPanel />
    </>
  );
};
