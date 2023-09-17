import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMainState, IViewport } from "./types";
import * as reducers from "./reducers";

export const firstExampleNodes = [
  // //0: lng 1: lat
  [21.163980743552333, 42.65128174651236],
  [20.73219031522064, 42.210636406729805],
  [20.65700948092869, 42.40072569442175],
  [20.435788936391443, 42.365963200562014],
  [20.285812099707325, 42.65831081327084],
  [20.487205177892154, 42.78170130067457],
  [21.122473021990345, 42.51913189185512],
  [21.469397852320917, 42.46342792188178],
];

export const initialViewport = {
  latitude: 42.4916,
  longitude: 20.8128,
  zoom: 8.5,
  pitch: 0,
  bearing: 0,
};

export const initialState: IMainState = {
  nodes: firstExampleNodes,
  viewport: initialViewport,
  algorithm: "convexHull",
  delay: 50,
  evaluatingDetailLevel: 2,
  maxEvaluatingDetailLevel: 2,
  showBestPath: true,

  bestPath: [],
  bestDisplaySegments: [],
  bestCost: null,

  evaluatingPaths: [],
  evaluatingCost: null,
  running: false,
  fullSpeed: false,
  paused: false,
  startedRunningAt: null,

  pointCount: firstExampleNodes.length,
  definingNodes: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setViewportState: reducers.setViewportState,
    resetEvaluatingState: reducers.resetEvaluatingState,
    resetBestPathState: reducers.resetBestPathState,
    setAlgorithm: reducers.setAlgorithm,
    setDelay: reducers.setDelay,
    setEvaluatingDetailLevel: reducers.setEvaluatingDetailLevel,
    setShowBestPath: reducers.setShowBestPath,
    startSolving: reducers.startSolving,
    goFullSpeed: reducers.goFullSpeed,
    pause: reducers.pause,
    unpause: reducers.unpause,
    stopSolving: reducers.stopSolving,
    setEvaluatingPaths: reducers.setEvaluatingPaths,
    setBestPath: reducers.setBestPath,
    setPointCount: reducers.setPointCount,
    setNodes: reducers.setNodes,
    startDefiningNodes: reducers.startDefiningNodes,
    addDefinedPoint: reducers.addDefinedPoint,
    stopDefiningNodes: reducers.stopDefiningNodes,
    setDefaultMap: reducers.setDefaultMap,
  },
});

export const {
  setViewportState,
  resetEvaluatingState,
  resetBestPathState,
  setAlgorithm,
  setDelay,
  setEvaluatingDetailLevel,
  setShowBestPath,
  startSolving,
  goFullSpeed,
  pause,
  unpause,
  stopSolving,
  setEvaluatingPaths,
  setBestPath,
  setPointCount,
  setNodes,
  startDefiningNodes,
  addDefinedPoint,
  stopDefiningNodes,
  setDefaultMap,
} = mainSlice.actions;

export default mainSlice.reducer;
