import { ExpandContainer } from "@/components/expand-container";
import { ReferenceLink } from "@/components/reference-link";
import { getSingleItemIndexDB, openDatabase, storeSingleItemIndexDB, stores } from "@/lib/indexDB";
import { Homily as IHomily } from "@/models/Homily";
import DOMPurify from "dompurify";
import { useState } from "react";

function generateHomilyDateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function generateLinkFromCurrentDate(currentDate: Date) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const formattedMonth = String(month).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");

  return `https://www.vaticannews.va/en/word-of-the-day/${year}/${formattedMonth}/${formattedDay}.html`;
}

export const Homily = ({ date }: { date: Date }) => {
  const [loading, setLoading] = useState(false);
  const [homily, setHomily] = useState<{ date: string | null; text: string }>({ date: null, text: "" });
  //TODO changing date should collapse the homily expandcontainer?

  const loadHomily = async () => {
    const homilyAlreadySet = homily.date === generateHomilyDateKey(date);
    if (homilyAlreadySet) return;

    setLoading(true);
    try {
      const homilyFromDB = await getHomilyFromIndexDB();
      if (homilyFromDB) {
        setHomily(homilyFromDB);
        return;
      }

      const homilyFromServer = await fetchHomilyFromServer();

      if (homilyFromServer && homilyFromServer.text.length > 0) {
        setHomily(homilyFromServer);
        await storeHomilyIndexDB(homilyFromServer);
      } else {
        setHomily({ date: generateHomilyDateKey(date), text: "Nincs vagy még nincs erre a dátumra homília. Próbáld később." });
      }
    } catch (error) {
      console.log(error);
      setHomily({ date: generateHomilyDateKey(date), text: "Hoppá! Valami hiba történt a betöltés közben. Próbáld később." });
    } finally {
      setLoading(false);
    }
  };

  const getHomilyFromIndexDB = async () => {
    const db = await openDatabase();
    return await getSingleItemIndexDB<IHomily>(db, stores.homilies, generateHomilyDateKey(date));
  };

  const fetchHomilyFromServer = async () => {
    const url = date
      ? `https://szene-backend.vercel.app/api/homily?datetime=${date.getTime()}`
      : "https://szene-backend.vercel.app/api/homily";

    const response = (await fetch(url).then((r) => {
      return r.json();
    })) as { date: string; text: string };

    const sanitizedText = DOMPurify.sanitize(response.text);
    return { ...response, text: sanitizedText };
  };

  const storeHomilyIndexDB = async (homily: IHomily) => {
    const db = await openDatabase();
    await storeSingleItemIndexDB<IHomily>(db, stores.homilies, homily);
  };

  return (
    <ExpandContainer title="HOMÍLIA (Angol)" onOpen={loadHomily} loading={loading} className="shadow">
      <div className="whitespace-pre-line mt-3">
        <p dangerouslySetInnerHTML={{ __html: homily.text }}></p>
        <div className="flex justify-center">
          <ReferenceLink link={generateLinkFromCurrentDate(date)} text="vaticannews.va/en/word-of-the-day" />
        </div>
      </div>
    </ExpandContainer>
  );
};
