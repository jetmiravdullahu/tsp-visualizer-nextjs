import { PayloadAction } from "@reduxjs/toolkit";
import { MainState } from "./types";
import { LngLat as LngLatType } from "react-map-gl";
import { initialState } from "./mainSlice";
import { TSP } from "@/solvers";

export const togglePlay = (state: MainState) => {
  state.playing = !state.playing;
  // !state.playing ? (state.delay = 0) : (state.delay = 1);
};

export const reset = (state: MainState) => {
  state.edges = [];
  // !state.playing ? (state.delay = 0) : (state.delay = 1);
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
export const setAccumulator = (
  state: MainState,
  action: PayloadAction<LngLatType[] | undefined>
) => {
  const accumulator = action.payload;
  accumulator ? (state.accumulator = accumulator) : (state.accumulator = []);
};
export const setEdges = (
  state: MainState,
  action: PayloadAction<LngLatType[][]>
) => {
  const edges = action.payload;
  state.edges = edges;
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
  action: PayloadAction<keyof typeof TSP>
) => {
  state.algorithm = action.payload;
};

export const setTimeStamp = (
  state: MainState,
  action: PayloadAction<number>
) => {
  state.timeStamp = action.payload;
  if (state.timeStamp >= state.edges.length) {
    state.playing = !state.playing;
  }
};
export const setDistance = (
  state: MainState,
  action: PayloadAction<number>
) => {
  state.distance = action.payload;
};
