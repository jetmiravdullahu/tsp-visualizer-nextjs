import { RootState } from "../store";

export const getIsPlaying = (state: RootState) => state.main.playing;
export const getIsDefiningPoints = (state: RootState) => state.main.definingPoints;
export const getNodes = (state: RootState) => state.main.nodes;
export const getEdges = (state: RootState) => state.main.edges;
export const getDelay = (state: RootState) => state.main.delay;
export const getAlgorithm = (state: RootState) => state.main.algorithm;
export const getTimeStamp = (state: RootState) => state.main.timeStamp;
export const getAccumulator = (state: RootState) => state.main.accumulator;
export const getDistance = (state: RootState) => state.main.distance;





