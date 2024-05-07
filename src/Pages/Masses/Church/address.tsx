import { ChurchGoogleMapLink } from "../components/church-google-map-link";

type Props = {
  churchName?: string;
  coords: { lat?: number; lng?: number };
  street?: string;
  city?: string;
  county?: string;
  country?: string;
};

export const Address = ({ churchName, coords, street, city, county, country }: Props) => {
  return (
    <div className="bg-white min-w-60  rounded-2xl max-w-[320px]">
      <div className="flex flex-col ">
        <span className="flex gap-3 items-center border-b  justify-between p-2 font-semibold text-black/75 text-xs">
          <ChurchGoogleMapLink churchName={churchName} city={city} street={street} coords={coords} />
        </span>
        <div className="flex flex-wrap ">
          <span className="pl-2 py-0.5  text-xs text-black/55 font-semibold">{city}, </span>
          <span className="px-2 py-0.5  text-xs text-black/55 font-semibold">{county}</span>
        </div>
        <span className="px-2 text-xs text-black/55 font-semibold border-b pb-1">{country}</span>
      </div>
    </div>
  );
};
