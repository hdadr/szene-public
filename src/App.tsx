import { stores } from "@/lib/indexDB";
import { useEffect } from "react";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import LoadingIndicator from "./components/ui/loading-indicator";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { loadItems } from "./lib/loader";
import { Saint } from "./models/Saint";
import { Word } from "./models/Word";

function App() {
  const navigate = useNavigate();
  const [homepage] = useLocalStorage("homepage", "/saints");
  const today = new Date();

  useEffect(() => {
    if (navigator && !navigator.onLine) {
      navigate(homepage);
      return;
    }

    const pingSupabase = async () => {
      const url = "https://szene-backend.vercel.app/api/supabase";
      await fetch(url).then(console.log).catch(console.log);
    };

    //TODO: remove supabase ping, (after 7 days of inactivity supabase stops the free tier db)
    pingSupabase();
    loadItems<Word>(stores.words, `words/${today.getFullYear()}.json`);
    loadItems<Saint>(stores.saints, "saints.json").then(() => navigate(homepage));
  }, []);

  return (
    <>
      <div className="flex flex-col w-screen h-screen items-center justify-center">
        <LoadingIndicator className="mt-2" />
        <span className="text-gray-600 font-semibold mt-2">Adatok betöltése</span>
      </div>
      <ScrollRestoration />
    </>
  );
}

export default App;
