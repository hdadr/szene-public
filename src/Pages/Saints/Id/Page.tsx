import { ReferenceLink } from "@/components/reference-link";
import { Button } from "@/components/ui/button";
import LoadingIndicator from "@/components/ui/loading-indicator";
import { formatDateForDisplay } from "@/lib/date";
import { getSingleItemIndexDB, openDatabase, stores } from "@/lib/indexDB";
import { Saint } from "@/models/Saint";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedSaint } from "@/store/slices/saints";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, unstable_useViewTransitionState, useNavigate, useParams } from "react-router-dom";

const idToDate = (id: string) => {
  const month = parseInt(id.substring(0, 2), 10);
  const day = parseInt(id.substring(2), 10);
  const currentDate = new Date();
  return new Date(currentDate.getFullYear(), month - 1, day);
};

export default function SaintPage() {
  const datetime = useSelector((state: RootState) => state.saints.datetime);
  const [saint, setSaint] = useState(useAppSelector((state: RootState) => state.saints.selectedSaint));
  const [date, setDate] = useState(new Date(datetime ? datetime : 0));
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const id = params.id;

    if (!id) {
      navigate("/saints");
      return;
    }

    const fetchSaintFromDB = async () => {
      const db = await openDatabase();
      const saint = await getSingleItemIndexDB<Saint>(db, stores.saints, id);
      if (!saint) {
        navigate("/saints");
        return;
      }
      setSaint(saint);
      setDate(idToDate(id));
      dispatch(setSelectedSaint({ saint, datetime: date.getTime() }));
    };

    const inStore = !!datetime;
    if (!inStore) {
      fetchSaintFromDB();
    }
  }, [params.id, navigate, datetime, dispatch, date]);
  const link = `https://archiv.katolikus.hu/szentek/${saint?.id + ".html"}`;
  const isTransitioning = unstable_useViewTransitionState(`/saints/${saint?.id}`);

  return (
    <>
      {saint ? (
        <div className="w-full p-4" style={{ viewTransitionName: isTransitioning ? `saint-${saint?.id}` : "" }}>
          <h1 style={{ viewTransitionName:  "saint-name" }} className=" w-full pb-4 dark:text-purple-200 text-purple-700  font-bold text-xl flex align-middle justify-center">
            {saint.name}
          </h1>
          <h5  className="flex-col items-center pb-6 dark:text-purple-200 text-purple-600 dark:font-extralight flex align-middle justify-center">
            <span>* {saint.birth}</span>
            <span>† {saint.death}</span>
          </h5>
          <div>
            <h2 className="pb-2 dark:text-purple-200 text-purple-600 dark:font-light">{formatDateForDisplay(date)}</h2>
            <div className="text-textTest">
              {saint.life.map((paragraph: string) => (
                <React.Fragment key={paragraph}>
                  <p>{paragraph}</p>
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="mb-10 flex justify-center">
            <ReferenceLink link={link} text={link.replace("https://","").replace(".html","")} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <LoadingIndicator />
        </div>
      )}

      <Link to="/saints" unstable_viewTransition>
        <Button
          shouldAnimate={false}
          variant="outline"
          size="icon"
          className="rounded-full fixed bottom-6 right-8 bg-gray-50">
          <ChevronLeft className="dark:text-purple-400 text-purple-700" size={28} />
        </Button>
      </Link>
    </>
  );
}
