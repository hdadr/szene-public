import LoadingIndicator from "@/components/ui/loading-indicator";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="error-page" className="flex flex-col items-center justify-center h-screen">
      <h1>Hoppá!</h1>
      <p className="pt-2 pb-12">Valami hiba történt.</p>
      <p className="flex flex-col items-center">
        <i className="pb-4">Kezdölap betöltése...</i>
        <LoadingIndicator />
      </p>
    </div>
  );
}
