import { PayloadAction } from "@reduxjs/toolkit";
import { IMainState, IViewport } from "./types";
import { firstExampleNodes, initialViewport } from "./mainSlice";

export const setViewportState = (
  state: IMainState,
  action: PayloadAction<IViewport>
) => {
  state.viewport = action.payload;
};
export const resetEvaluatingState = (state: IMainState) => {
  state.evaluatingPaths = [];
  state.evaluatingCost = null;
};
export const resetBestPathState = (state: IMainState) => {
  state.bestPath = [];
  state.bestCost = null;
};
export const setAlgorithm = (
  state: IMainState,
  action: PayloadAction<{ algorithm: string; defaults: object }>
) => {
  state.algorithm = action.payload.algorithm;
  Object.assign(state, action.payload.defaults);
};
export const setDelay = (state: IMainState, action: PayloadAction<number>) => {
  state.delay = action.payload;
};
export const setEvaluatingDetailLevel = (
  state: IMainState,
  action: PayloadAction<number>
) => {
  state.evaluatingDetailLevel = action.payload;
  if (action.payload) {
    state.evaluatingPaths = state.evaluatingPaths;
    state.evaluatingCost = state.evaluatingCost;
  } else {
    state.evaluatingPaths = [];
    state.evaluatingCost = null;
  }
};
export const setShowBestPath = (
  state: IMainState,
  action: PayloadAction<boolean>
) => {
  state.showBestPath = action.payload;
};
export const startSolving = (state: IMainState) => {
  state.showBestPath = false;
  state.running = true;
  state.startedRunningAt = Date.now();
  state.pointCount = state.nodes.length;
};
export const goFullSpeed = (state: IMainState) => {
  state.showBestPath = true;
  state.evaluatingDetailLevel = 0;
  state.evaluatingPaths = [];
  state.fullSpeed = true;
};
export const pause = (state: IMainState) => {
  state.paused = true;
  state.running = false;
};
export const unpause = (state: IMainState) => {
  state.paused = false;
  state.running = true;
};
export const stopSolving = (state: IMainState) => {
  state.nodes =
    state.bestPath.length > 0
      ? state.bestPath.slice(0, state.bestPath.length - 1)
      : state.nodes;
  state.showBestPath = true;
  state.running = false;
  state.paused = false;
  state.fullSpeed = false;
  state.startedRunningAt = null;
};
export const setEvaluatingPaths = (
  state: IMainState,
  action: PayloadAction<{ paths: any[]; cost: number }>
) => {
  state.evaluatingPaths = action.payload.paths;
  state.evaluatingCost = action.payload.cost;
};
export const setBestPath = (
  state: IMainState,
  action: PayloadAction<{ path: any[]; cost: number }>
) => {
  state.bestPath = action.payload.path;
  state.bestCost = action.payload.cost;
};
export const setPointCount = (
  state: IMainState,
  action: PayloadAction<number>
) => {
  state.pointCount = action.payload;
};
export const setNodes = (state: IMainState, action: PayloadAction<any[]>) => {
  state.nodes = action.payload;
};
export const startDefiningNodes = (state: IMainState) => {
  state.definingNodes = true;
  state.nodes = [];
  state.pointCount = 0;
};
export const addDefinedPoint = (
  state: IMainState,
  action: PayloadAction<Array<number>>
) => {
  state.nodes.push(action.payload);
  state.pointCount++;
};
export const stopDefiningNodes = (state: IMainState) => {
  state.definingNodes = false;
};
export const setDefaultMap = (state: IMainState) => {
  state.viewport = initialViewport;
  state.nodes = firstExampleNodes;
  state.pointCount = firstExampleNodes.length;
};
