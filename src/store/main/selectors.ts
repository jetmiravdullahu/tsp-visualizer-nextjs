import { RootState } from "../store";

export const getIsPlaying = (state: RootState) => state.main.playing;
export const getIsDefiningPoints = (state: RootState) => state.main.definingPoints;
export const getNodes = (state: RootState) => state.main.nodes;
export const getEdges = (state: RootState) => state.main.edges;
export const getDelay = (state: RootState) => state.main.delay;
export const getAlgorithm = (state: RootState) => state.main.algorithm;


