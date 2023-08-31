import { createSlice } from "@reduxjs/toolkit";
import { MainState } from "./types";
import * as reducers from "./reducers";
import { LngLat } from "mapbox-gl";

export const initialState: MainState = {
  playing: false,
  definingPoints: false,
  nodes: [
    new LngLat(-73.85835427500902, 40.56507951957753),
    new LngLat(-77.54976052500858, 38.772432514145194),
    new LngLat(-78.91206521250587, 42.66742768420476),
    new LngLat(-70.95796365000933, 42.66742768420476),
    new LngLat(-80.27436990000314, 26.176558881220437),
    new LngLat(-84.4052292750001, 34.108547937473524),
    new LngLat(-95.3036667750014, 29.287759374472813),
    new LngLat(-84.66890115000008, 30.089457425014395),
    new LngLat(-89.89839333750201, 29.746655988569763),
    new LngLat(-124.26362771250061, 41.13019627380825),
    new LngLat(-118.63862771249869, 33.999320468363095),
    new LngLat(-96.62202615000125, 32.640688397241334),
    new LngLat(-101.89546365000065, 34.97727964358472),
    new LngLat(-111.38765114999953, 35.01327961148759),
    new LngLat(-115.56245583750162, 36.08588188690158),
    new LngLat(-112.22261208749687, 33.23080293029681),
    new LngLat(-82.55952615000031, 28.24770207922181),
    new LngLat(-117.2323777124963, 32.97311239658548),
    new LngLat(-122.81343240000076, 48.152468818056875),
    new LngLat(-123.12104958749816, 38.222145234071036),
    new LngLat(-97.76460427500368, 30.089457425014395),
    new LngLat(-120.13276833749595, 39.72528830651809),
    new LngLat(-111.82710427499693, 41.13019627380825),
    new LngLat(-105.2353073999977, 39.961475963760066),
    new LngLat(-87.43745583749975, 41.69048709677229),
    new LngLat(-90.20601052499944, 38.772432514145194),
    new LngLat(-117.27632302500142, 47.50341272285311),
    new LngLat(-93.1064011499991, 45.29144400095841),
    new LngLat(-122.72554177499823, 45.8757982618686),
  ],
  edges: [],
  delay: 0,
  algorithm: "1",
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    togglePlay: reducers.togglePlay,
    toggleDefiningPoints: reducers.toggleDefiningPoints,
    addNode: reducers.addNode,
    addEdge: reducers.addEdge,
    resetNodes: reducers.resetNodes,
    resetProgress: reducers.resetProgress,
    setDelay: reducers.setDelay,
    setAlgorithm: reducers.setAlgorithm,
  },
});

export const {
  togglePlay,
  toggleDefiningPoints,
  addNode,
  addEdge,
  resetNodes,
  resetProgress,
  setDelay,
  setAlgorithm,
} = mainSlice.actions;

export default mainSlice.reducer;
