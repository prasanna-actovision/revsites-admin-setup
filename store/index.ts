import { configureStore } from "@reduxjs/toolkit";
import globalSettingsSlice from "@/store/GlobalSettings/GlobalSlice";
export const store = configureStore({
  reducer: {
    globalSettings: globalSettingsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
