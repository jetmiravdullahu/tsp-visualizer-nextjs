import { PayloadAction } from "@reduxjs/toolkit";
import { MainState } from "./types";
import { LngLat as LngLatType } from "react-map-gl";
import { initialState } from "./mainSlice";

export const togglePlay = (state: MainState) => {
  state.playing = !state.playing;
  if (!state.playing) state.edges = [];
};
export const toggleDefiningPoints = (state: MainState) => {
  state.definingPoints = !state.definingPoints;
  if (state.definingPoints) {
    state.nodes = [];
    state.edges = [];
  }
};
export const addNode = (
  state: MainState,
  action: PayloadAction<LngLatType>
) => {
  const clickedCoordinates = action.payload;
  state.nodes = [...state.nodes, clickedCoordinates];
};
export const addEdge = (
  state: MainState,
  action: PayloadAction<LngLatType>
) => {
  const clickedCoordinates = action.payload;
  state.edges = [...state.edges, clickedCoordinates];
};
export const resetNodes = (state: MainState) => {
  state.nodes = initialState.nodes;
  state.edges = [];
};

export const resetProgress = (state: MainState) => {
  state.playing = false;
  state.edges = [];
};

export const setDelay = (state: MainState, action: PayloadAction<number>) => {
  state.delay = action.payload;
};
export const setAlgorithm = (
  state: MainState,
  action: PayloadAction<string>
) => {
  state.algorithm = action.payload;
};
