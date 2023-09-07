import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMainState, IViewport } from "./types";
import * as reducers from "./reducers";
import { LngLat } from "mapbox-gl";
import { TSP } from "@/solvers";

const firstExampleNodes = [
  //0: lng 1: lat
  { lng: -73.85835427500902, lat: 40.56507951957753 },
  { lng: -77.54976052500858, lat: 38.772432514145194 },
  { lng: -78.91206521250587, lat: 42.66742768420476 },
  { lng: -70.95796365000933, lat: 42.66742768420476 },
  { lng: -80.27436990000314, lat: 26.176558881220437 },
  { lng: -84.4052292750001, lat: 34.108547937473524 },
  { lng: -82.55952615000031, lat: 28.24770207922181 },
  { lng: -84.66890115000008, lat: 30.089457425014395 },
  { lng: -89.89839333750201, lat: 29.746655988569763 },
  { lng: -96.62202615000125, lat: 32.640688397241334 },
  { lng: -95.3036667750014, lat: 29.287759374472813 },
  { lng: -97.76460427500368, lat: 30.089457425014395 },
  { lng: -101.89546365000065, lat: 34.97727964358472 },
  { lng: -112.22261208749687, lat: 33.23080293029681 },
  { lng: -111.38765114999953, lat: 35.01327961148759 },
  { lng: -115.56245583750162, lat: 36.08588188690158 },
  { lng: -118.63862771249869, lat: 33.999320468363095 },
  { lng: -117.2323777124963, lat: 32.97311239658548 },
  { lng: -123.12104958749816, lat: 38.222145234071036 },
  { lng: -124.26362771250061, lat: 41.13019627380825 },
  { lng: -120.13276833749595, lat: 39.72528830651809 },
  { lng: -111.82710427499693, lat: 41.13019627380825 },
  { lng: -105.2353073999977, lat: 39.961475963760066 },
  { lng: -87.43745583749975, lat: 41.69048709677229 },
  { lng: -93.1064011499991, lat: 45.29144400095841 },
  { lng: -90.20601052499944, lat: 38.772432514145194 },
  { lng: -117.27632302500142, lat: 47.50341272285311 },
  { lng: -122.72554177499823, lat: 45.8757982618686 },
  { lng: -122.81343240000076, lat: 48.152468818056875 },
];

const initialViewport = {
  latitude: 39.8097343,
  longitude: -98.5556199,
  zoom: 4,
};

export const initialState: IMainState = {
  points: firstExampleNodes.sort(() => Math.random() + 0.5),
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
  definingPoints: false,

  siteInfoOpen: false,
  algInfoOpen: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    toggleSiteInfoOpen(state) {
      state.siteInfoOpen = !state.siteInfoOpen;
    },
    toggleAlgInfoOpen(state) {
      state.algInfoOpen = !state.algInfoOpen;
    },
    setViewportState(state, action: PayloadAction<IViewport>) {
      state.viewport = action.payload;
    },
    resetEvaluatingState(state) {
      state.evaluatingPaths = [];
      state.evaluatingCost = null;
    },
    resetBestPathState(state) {
      state.bestPath = [];
      state.bestCost = null;
    },
    setAlgorithm(
      state,
      action: PayloadAction<{ algorithm: string; defaults: object }>
    ) {
      state.algorithm = action.payload.algorithm;
      Object.assign(state, action.payload.defaults);
    },
    setDelay(state, action: PayloadAction<number>) {
      state.delay = action.payload;
    },
    setEvaluatingDetailLevel(state, action: PayloadAction<number>) {
      state.evaluatingDetailLevel = action.payload;
      if (action.payload) {
        state.evaluatingPaths = state.evaluatingPaths;
        state.evaluatingCost = state.evaluatingCost;
      } else {
        state.evaluatingPaths = [];
        state.evaluatingCost = null;
      }
    },
    setShowBestPath(state, action: PayloadAction<boolean>) {
      state.showBestPath = action.payload;
    },
    startSolving(state) {
      state.showBestPath = false;
      state.running = true;
      state.startedRunningAt = Date.now();
      state.pointCount = state.points.length;
    },
    goFullSpeed(state) {
      state.showBestPath = true;
      state.evaluatingDetailLevel = 0;
      state.evaluatingPaths = [];
      state.fullSpeed = true;
    },
    pause(state) {
      state.paused = true;
      state.running = false;
    },
    unpause(state) {
      state.paused = false;
      state.running = true;
    },
    stopSolving(state) {
      state.points =
        state.bestPath.length > 0
          ? state.bestPath.slice(0, state.bestPath.length - 1)
          : state.points;
      state.showBestPath = true;
      state.running = false;
      state.paused = false;
      state.fullSpeed = false;
      state.startedRunningAt = null;
    },
    setEvaluatingPaths(
      state,
      action: PayloadAction<{ paths: any[]; cost: number }>
    ) {
      state.evaluatingPaths = action.payload.paths;
      state.evaluatingCost = action.payload.cost;
    },
    setBestPath(state, action: PayloadAction<{ path: any[]; cost: number }>) {
      state.bestPath = action.payload.path;
      state.bestCost = action.payload.cost;
    },
    setPointCount(state, action: PayloadAction<number>) {
      state.pointCount = action.payload;
    },
    setPoints(state, action: PayloadAction<any[]>) {
      state.points = action.payload;
    },
    startDefiningPoints(state) {
      state.points = [];
      state.definingPoints = true;
      state.pointCount = 0;
    },
    addDefinedPoint(state, action: PayloadAction<any>) {
      state.points.push(action.payload);
      state.pointCount++;
    },
    stopDefiningPoints(state) {
      state.definingPoints = false;
    },
    setDefaultMap(state) {
      state.viewport = initialViewport;
      state.points = firstExampleNodes;
      state.pointCount = firstExampleNodes.length;
    },
  },
});

export const {
  toggleSiteInfoOpen,
  toggleAlgInfoOpen,
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
  setPoints,
  startDefiningPoints,
  addDefinedPoint,
  stopDefiningPoints,
  setDefaultMap,
} = mainSlice.actions;

export default mainSlice.reducer;
