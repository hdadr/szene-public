import { SaintsList } from "@/Pages/Saints/components/saints-list";
import { BottomPanel } from "@/components/bottom-panel";
import { DateBar } from "@/components/date-bar";
import { HeaderContainer } from "@/components/header-container";
import { ReferenceLink } from "@/components/reference-link";
import { TitleBar } from "@/components/title-bar";
import { Separator } from "@/components/ui/separator";
import { getIDsForSaints } from "@/lib/getIDsForSaints";
import { getItemsByKeyIndexDB, openDatabase, stores } from "@/lib/indexDB";
import { Saint } from "@/models/Saint";
import { RootState } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { FeastDisplay, FeastType } from "./components/feast-display";
import { formatDateToId } from "./libs/id";

export default function SaintsPage() {
  const datetime = useAppSelector((state: RootState) => state.saints.datetime);
  const [date, setDate] = useState(datetime ? new Date(datetime) : new Date());
  const [saintsBySelectedDate, setSaintsBySelectedDate] = useState<Saint[]>([]);
  const [feastType, setFeastType] = useState<FeastType | undefined>();

  useEffect(() => {
    const fetchSaintsByDate = async () => {
      const db = await openDatabase();
      const ids = getIDsForSaints(formatDateToId(date));
      setSaintsBySelectedDate(await getItemsByKeyIndexDB<Saint>(db, stores.saints, ids));
    };

    fetchSaintsByDate();
  }, [date]);

  return (
    <>
      <HeaderContainer>
        <TitleBar title="Szentek élete" />
        <DateBar className="mb-1" date={date} onDateChange={(newDate) => setDate(newDate)} animateChange />
      </HeaderContainer>

      {/* TODO: search saint by name */}
      <div /* className="flex  w-full pr-2 pt-2 mb-4 items-end justify-end" */>
        {/* <ExpandableInput /> */}
        {/* <Autocomplete /> */}
      </div>

      {feastType?.visible && (
        <div className="self-start text-xs font-semibold text-black/60 my-3 ml-3">
          {feastType.type === "feast-day" ? "Ünnepnap" : "Időszak"}
        </div>
      )}

      <div className="w-full px-3">
        <FeastDisplay date={date} onFeastVisibilityChange={setFeastType} />
      </div>

      {feastType?.visible && (
        <>
          <Separator className="my-3" />
          <div className="self-start text-xs font-semibold text-black/60 ml-3">Szentek</div>
        </>
      )}

      <div className="mt-3 w-full px-3">
        <SaintsList saints={saintsBySelectedDate} date={date} />
      </div>

      <ReferenceLink link="https://archiv.katolikus.hu/szentek" text="archiv.katolikus.hu/szentek" />

      <BottomPanel />
    </>
  );
}
