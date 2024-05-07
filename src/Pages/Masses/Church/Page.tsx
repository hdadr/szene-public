import { MassTimeTable } from "@/Pages/Masses/Church/mass-timetable";
import placeholderImage from "@/assets/churches/church_fallback.webp";
import { ImageWithPlaceholder } from "@/components/ImageWithPlaceholder";
import { HeaderContainer } from "@/components/header-container";
import { ReferenceLink } from "@/components/reference-link";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, unstable_useViewTransitionState } from "react-router-dom";
import { Address } from "./address";

export const ChurchPage = () => {
  const church = useAppSelector((state: RootState) => state.masses.selectedChurch);
  const isTransitioning = unstable_useViewTransitionState(`/masses/church/${church?.tid}`);
  const link = `https://miserend.hu/templom/${church?.tid}`;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col h-full items-center">
      <HeaderContainer>
        <div className="w-full flex flex-col items-center text-purple-600 text-lg font-bold ">
          <span>{church?.nev}</span>
          <span className="text-base text-purple-600 font-medium">{church?.ismertnev}</span>
        </div>
      </HeaderContainer>

      <ImageWithPlaceholder
        className="bg-cover w-full object-cover max-h-[50%] max-w-[90%] rounded-2xl shadow-sm mt-3"
        style={{ viewTransitionName: isTransitioning ? `image-${church?.tid}` : "", objectPosition: "50% 30%" }}
        placeholderSrc={placeholderImage}
        src={church?.kep ?? ""}
        alt={church?.nev ?? ""}
      />

      <div className="w-full flex flex-col items-center mt-3">
        <div className="self-start text-xs font-semibold text-black/60 my-3 ml-3">Miserend</div>
        <MassTimeTable masses={church?.misek} />
      </div>

      <div className="flex flex-col w-full">
        <div className="self-start text-xs font-semibold text-black/60 mt-3 ml-3">Cím</div>
        <div className="max-w-[320px] self-center pb-3">
          <Address
            churchName={church?.ismertnev ?? church?.nev ?? ""}
            coords={{ lat: church?.lat, lng: church?.lng }}
            city={church?.varos}
            street={church?.cim}
            county={church?.megye}
            country={church?.orszag}
          />
        </div>
      </div>

      <ReferenceLink className="pb-4" link={link} text={link.replace("https://", "")} />

      <Link to="/masses" unstable_viewTransition>
        <Button
          shouldAnimate={false}
          variant="outline"
          size="icon"
          className="rounded-full fixed bottom-6 right-6 bg-white">
          <ChevronLeft className="dark:text-purple-400 text-purple-700" size={28} />
        </Button>
      </Link>
    </div>
  );
};
