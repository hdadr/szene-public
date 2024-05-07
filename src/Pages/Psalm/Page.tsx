import { BottomPanel } from "@/components/bottom-panel";
import { HeaderContainer } from "@/components/header-container";
import { TitleBar } from "@/components/title-bar";

export const PsalmPage = () => {
  return (
    <>
      <HeaderContainer>
        <TitleBar title="Zsolozsma" />
      </HeaderContainer>

      <div className="text-muted-foreground  mt-6">Zsolozsma a napi időszaknak megfelelően</div>
      <div className="text-muted-foreground text-xs mt-3">A fejlesztése még nem kezdődött el...</div>
      <BottomPanel />
    </>
  );
};
