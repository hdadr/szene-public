import App from "@/App.tsx";
import ErrorPage from "@/Pages/ErrorPage";
import { ChurchPage } from "@/Pages/Masses/Church/Page";
import { MassesPage } from "@/Pages/Masses/Page";
import SaintsPage from "@/Pages/Saints/Page";
import { SettingsPage } from "@/Pages/Settings/Page";
import WordsPage from "@/Pages/Words/Page";
import { createBrowserRouter } from "react-router-dom";
import { BiblePage } from "./Pages/Bible/Page";
import { PsalmPage } from "./Pages/Psalm/Page";
import SaintPage from "./Pages/Saints/Id/Page";

const root = {
  path: "/",
  element: <App />,
  errorElement: <ErrorPage />,
};

const saints = [
  {
    path: "/saints",
    element: <SaintsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/saints/:id",
    element: <SaintPage />,
    errorElement: <ErrorPage />,
  },
];

const words = [
  {
    path: "/words",
    element: <WordsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/words/:date",
    element: <WordsPage />,
    errorElement: <ErrorPage />,
  },
];

const masses = [
  {
    path: "/masses",
    element: <MassesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/masses/church/:id",
    element: <ChurchPage />,
    errorElement: <ErrorPage />,
  },
];

const settings = {
  path: "/settings",
  element: <SettingsPage />,
  errorElement: <ErrorPage />,
};

const bible = {
  path: "/bible",
  element: <BiblePage />,
  errorElement: <ErrorPage />,
};

const psalm = {
  path: "/psalm",
  element: <PsalmPage />,
  errorElement: <ErrorPage />,
};

export const browserRouter = createBrowserRouter([root, ...saints, ...words, ...masses, settings, bible, psalm]);
