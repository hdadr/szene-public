import placeholderImage from "@/assets/churches/church_fallback.webp";
import { ImageWithPlaceholder } from "@/components/ImageWithPlaceholder";
import { Separator } from "@/components/ui/separator";
import { Church } from "@/models/Church";
import { useAppDispatch } from "@/store/hooks";
import { setSelectedChurch } from "@/store/slices/masses";
import { LinkIcon } from "lucide-react";
import { Link, unstable_useViewTransitionState } from "react-router-dom";
import { ChurchGoogleMapLink } from "../church-google-map-link";
import { NextMassesDisplay } from "../next-masses-display";

export const MarkerChurchInfo = ({ church }: { church: Church }) => {
  const dispatch = useAppDispatch();
  const isTransitioning = unstable_useViewTransitionState(`/masses`);

  return (
    <div className="flex flex-col items-center w-[100px]">
      <ImageWithPlaceholder
        style={{ viewTransitionName: isTransitioning ? `image-${church.tid}` : "" }}
        className="object-cover max-h-24 max-w-[90%] rounded-2xl shadow-sm mb-2"
        placeholderSrc={placeholderImage}
        src={church?.kep ?? ""}
        alt={church?.nev ?? ""}
      />

      <Link
        className="mb-2"
        to={`/masses/church/${church.tid}`}
        onClick={() => dispatch(setSelectedChurch(church))}
        unstable_viewTransition>
        <div className="flex text-purple-600 font-semibold">
          {church.nev}
          <LinkIcon className="w-4 h-4" />
        </div>
      </Link>

      <Separator className="mb-2" />

      <div className="self-start mb-2">
        <ChurchGoogleMapLink
          churchName={church.nev}
          city={church.varos}
          street={church.cim}
          coords={{ lat: church.lat, lng: church.lng }}
        />
      </div>

      <Separator className="mb-2" />

      <div className="self-start ">
        <NextMassesDisplay className="scale-[0.8] -ml-2" church={church} />
      </div>
    </div>
  );
};
