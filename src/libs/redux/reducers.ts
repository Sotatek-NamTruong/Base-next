import { appStateReducer } from "@/stores/app";
import { combineReducers } from "redux";
import { baseQueryApi } from "./baseQueryApi";

const appReducer = combineReducers({
  app: appStateReducer,
  [baseQueryApi.reducerPath]: baseQueryApi.reducer,
});

export const rootReducer = (state: any, action: any) =>
  appReducer(state, action);
