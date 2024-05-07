import { Alleluia } from "@/Pages/Words/components/alleluia";
import { Homily } from "@/Pages/Words/components/homily";
import { BottomPanel } from "@/components/bottom-panel";
import { DateBar } from "@/components/date-bar";
import { HeaderContainer } from "@/components/header-container";
import { ReferenceLink } from "@/components/reference-link";
import { TitleBar } from "@/components/title-bar";
import { getSingleItemIndexDB, openDatabase, stores } from "@/lib/indexDB";
import { generateKeyFromDate } from "@/lib/words";
import { Word } from "@/models/Word";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Prayer } from "./components/prayer";
import { Psalm } from "./components/psalm";
import { Reading } from "./components/reading";

export default function WordsPage() {
  const params = useParams();
  const [date, setDate] = useState<Date>(new Date());
  const [wordOfTheDay, setWordOfTheDay] = useState<Word>();

  useEffect(() => {
    const [year, month, day] = params.date ? params.date.split("-") : [];
    const dateFromParam = new Date(+year, +month - 1, +day);

    if (dateFromParam.toString() === "Invalid Date") {
      setDate(new Date());
      return;
    }

    setDate(dateFromParam);
  }, [params.date]);

  useEffect(() => {
    if (!date) return;
    const getWordOfTheDay = async () => {
      const db = await openDatabase();
      const word: Word = await getSingleItemIndexDB(db, stores.words, generateKeyFromDate(date));
      setWordOfTheDay(word);
    };

    getWordOfTheDay();
  }, [date]);

  const changeDate = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <>
      <HeaderContainer>
        <TitleBar title="Ige" />
        <DateBar className="mb-1" date={date} onDateChange={changeDate} animateChange />
      </HeaderContainer>

      <div className="p-2">
        {wordOfTheDay?.olvasmany && (
          <>
            <Reading reading={wordOfTheDay.olvasmany} />
            <Psalm psalm={wordOfTheDay.zsoltar} /> 
            <Reading reading={wordOfTheDay.szentlecke} />
          </>
        )}
        {!wordOfTheDay?.olvasmany && (
          <>
            <Reading reading={wordOfTheDay?.szentlecke} />
            <Psalm psalm={wordOfTheDay?.zsoltar} />
          </>
        )}
        <Alleluia alleluia={wordOfTheDay?.alleluia} />
        <Reading reading={wordOfTheDay?.evangelium} />
        <Homily date={date} />
        <Prayer prayer={wordOfTheDay?.konyorgesek} /> 

        <div className="flex justify-center">
          <ReferenceLink link="https://igenaptar.katolikus.hu/" text="igenaptar.katolikus.hu" />
        </div>
      </div>

      <BottomPanel />
    </>
  );
}
