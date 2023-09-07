import { createSelector } from "reselect";
import {
  START_POINT_COLOR,
  POINT_COLOR,
  BEST_PATH_COLOR,
  EVALUATING_PATH_COLOR,
} from "../../constants";
import { RootState } from "../store";

//
// FOR UI
//
export const selectSiteInfoOpen = (state: RootState) => state.main.siteInfoOpen;
export const selectAlgInfoOpen = (state: RootState) => state.main.algInfoOpen;

//
//  FOR SOLVER CONTROLS
//
export const selectAlgorithm = (state: RootState) => state.main.algorithm;

export const selectDelay = (state: RootState) => state.main.delay;

export const selectEvaluatingDetailLevel = (state: RootState) =>
  state.main.evaluatingDetailLevel;

export const selectMaxEvaluatingDetailLevel = (state: RootState) =>
  state.main.maxEvaluatingDetailLevel;

export const selectRunning = (state: RootState) => state.main.running;

export const selectFullSpeed = (state: RootState) => state.main.fullSpeed;

export const selectPaused = (state: RootState) => state.main.paused;

export const selectStartedRunningAt = (state: RootState) =>
  state.main.startedRunningAt;

//
// FOR POINT CONTROLS
//
export const selectDefiningPoints = (state: RootState) =>
  state.main.definingPoints;

export const selectPointCount = (state: RootState) => state.main.pointCount;

//
// FOR PLOT
//

export const selectViewport = (state: RootState) => state.main.viewport;

export const selectPoints = (state: RootState) => state.main.points;
export const selectPointsDisplay = createSelector(selectPoints, (points) =>
  points.map((p, idx) => ({
    position: p,
    color: idx === 0 ? START_POINT_COLOR : POINT_COLOR,
  }))
);

export const selectShowBestPath = (state: RootState) => state.main.showBestPath;
export const selectBestPath = (state: RootState) => state.main.bestPath;
export const selectBestPathDisplay = createSelector(
  selectBestPath,
  selectShowBestPath,
  (path, show) => ({
    path: show ? path : [],
    color: BEST_PATH_COLOR,
    width: 20,
  })
);

export const selectBestCost = (state: RootState) => state.main.bestCost;
export const selectBestCostDisplay = createSelector(selectBestCost, (cost) =>
  cost ? cost.toFixed(2) : ""
);

export const selectEvaluatingPaths = (state: RootState) =>
  state.main.evaluatingPaths;
export const selectEvaluatingPathsDisplay = createSelector(
  selectEvaluatingPaths,
  (paths) =>
    paths.map(({ path, color }) => ({
      path,
      color: color || EVALUATING_PATH_COLOR,
      width: 5,
    }))
);

export const selectEvaluatingCost = (state: RootState) =>
  state.main.evaluatingCost;
export const selectEvaluatingCostDisplay = createSelector(
  selectEvaluatingCost,
  (cost) => (cost ? cost.toFixed(2) : "")
);

export const selectPlotPaths = createSelector(
  selectBestPathDisplay,
  selectEvaluatingPathsDisplay,
  (bestPath, evaluatingPaths) => [...evaluatingPaths, bestPath]
);
