import { configureStore } from "@reduxjs/toolkit";
import { massesMiddleware } from "./middlewares/masses";
import { saintsMiddleware } from "./middlewares/saints";
import masses from "./slices/masses";
import saints from "./slices/saints";

export const store = configureStore({
  reducer: { saints, masses },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(saintsMiddleware.middleware, massesMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
