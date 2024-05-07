import { Saint } from "@/models/Saint";
import { Glasses } from "lucide-react";
import { Link, unstable_useViewTransitionState } from "react-router-dom";

type Props = {
  saint: Saint;
  seen: boolean;
};

const SaintListItem = ({ saint, seen }: Props) => {
  const isTransitioning = unstable_useViewTransitionState(`/saints`);

  return (
    <Link to={`/saints/${saint?.id}`} unstable_viewTransition>
      <div
        style={{ viewTransitionName: isTransitioning ? `saint-${saint?.id}` : "" }}
        className={`rounded-2xl border bg-card text-card-foreground shadow   ${
          seen ? "border-gray-100 dark:border-gray-800" : "border-gray-200 dark:border-gray-600"
        }`}>
        <div className="flex flex-col space-y-1.5 p-6">
          <h3
            style={{ viewTransitionName: isTransitioning ? `saint-name-${saint?.id}` : "" }}
            className={`text-lg font-semibold leading-none tracking-tight text-black/80`}>
            {saint.name}
          </h3>
          <div
            style={{ viewTransitionName: isTransitioning ? `saint-lifetime-${saint?.id}` : "" }}
            className="flex flex-col pt-2 text-sm text-muted-foreground">
            <span>* {saint.birth}</span>
            <div className="flex justify-between items-center">
              <span>† {saint.death}</span>
              <span className="text-muted-foreground">{seen ? <Glasses size={14} /> : null}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { SaintListItem };

