import { Gmaps } from "@/components/svg-icons";
import { Link } from "react-router-dom";

type Props = { churchName?: string; street?: string; city?: string; coords: { lat?: number; lng?: number } };

export const ChurchGoogleMapLink = ({ churchName, street, city, coords }: Props) => {
  const mapLink = `https://maps.google.com/?q=${churchName + " " + street + " " + city}`;

  return (
    <>
      {churchName && coords.lat && (
        <Link to={mapLink} target="_blank" className="mt-3">
          <div className="flex">
            <span className="text-xs text-purple-700 font-medium text-muted-foreground ">
              {street ? street.toUpperCase() : churchName}
            </span>
            <Gmaps className="w-3 ml-3" />
          </div>
        </Link>
      )}
    </>
  );
};
