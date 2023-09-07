import { PayloadAction } from "@reduxjs/toolkit";
import { IPoint, IMainState } from "./types";
import { initialState } from "./mainSlice";
import { TSP } from "@/solvers";

export const test = (state: IMainState) => {
  state.siteInfoOpen = true;
};
export const test2 = (state: IMainState, payload: PayloadAction<boolean>) => {
  state.siteInfoOpen = payload.payload;
};
