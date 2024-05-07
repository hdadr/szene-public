import { ChurchTabs } from "@/Pages/Masses/components/church-tabs";
import ChurchBackground from "@/assets/churches/church8.webp";
import { BottomPanel } from "@/components/bottom-panel";
import { HeaderContainer } from "@/components/header-container";
import { ReferenceLink } from "@/components/reference-link";
import { TitleBar } from "@/components/title-bar";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setScrollPosition } from "@/store/slices/masses";
import { LayoutGroup, motion } from "framer-motion";
import { useEffect } from "react";
import { SearchForm } from "./components/form";
import { Map } from "./components/map";


export const MassesPage = () => {
  const dispatch = useAppDispatch();
  const { scrollPosition, searchFormVisible } = useAppSelector((state: RootState) => state.masses.layout);
  const link = `https://miserend.hu`;

  useEffect(() => {
    window.scrollTo({ top: scrollPosition });
  }, []);

  useEffect(() => {
    const handleScroll = () => dispatch(setScrollPosition(window.scrollY));
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  return (
    <>
      <HeaderContainer>
        <TitleBar title="Misék és Templomok" />
      </HeaderContainer>

      <LayoutGroup>
        {searchFormVisible && (
          <div
            style={{
              backgroundImage: `url(${ChurchBackground})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className="bg-white px-3 flex mt-2 mb-3 py-10 flex-col w-[96%] rounded-2xl items-center shadow border border-gray-200">
            <SearchForm />
          </div>
        )}

        <motion.div
          layout="position"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.32, ease: "easeInOut" } }}
          layoutId="tabs"
          className="flex flex-col items-center w-full">
          <ChurchTabs />
        </motion.div>

        <Map />
      </LayoutGroup>

      <ReferenceLink className="pb-3" link={link} text={link.replace("https://", "")} />

      <BottomPanel />
    </>
  );
};
