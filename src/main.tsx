import { ThemeProvider } from "@/components/theme-provider.tsx";
import "@/index.css";
import { store } from "@/store/";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { browserRouter } from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light">
      <Provider store={store}>
        <main className="flex flex-col min-[540px]:w-[540px] bg-white items-center w-full h-screen">
          <RouterProvider router={browserRouter} />
        </main>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
