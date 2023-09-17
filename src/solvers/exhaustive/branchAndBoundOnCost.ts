import { totalDistance, setDifference } from "../helpers";

import {
  EVALUATING_PATH_COLOR,
  EVALUATING_ERROR_COLOR,
  EVALUATING_SEGMENT_COLOR,
} from "../../constants";
import { IPoint } from "@/store/main/types";

export const branchAndBoundOnCost = async (
  points: IPoint[],
  path: IPoint[] = [],
  visited: IPoint[] = [],
  overallBest: number = Infinity
) => {
  let pointsSet = new Set(points);
  let visitedSet = new Set(visited);

  if (visited === null) {
    // initial call
    path = [points.shift()!];
  }

  // figure out which points are left
  const available = setDifference([...pointsSet], [...visitedSet]);

  // calculate the cost, from here, to go home
  const backToStart = [...path, path[0]];
  const cost = totalDistance(backToStart);

  if (cost > overallBest) {
    // we may not be done, but have already traveled further than the best path
    // no reason to continue
    self.setEvaluatingPaths(
      () => ({
        paths: [
          {
            path: path.slice(0, path.length - 1),
            color: EVALUATING_SEGMENT_COLOR,
          },
          {
            path: path.slice(path.length - 2, path.length + 1),
            color: EVALUATING_ERROR_COLOR,
          },
        ],
        cost,
      }),
      2
    );
    await self.sleep();

    return [null, null];
  }

  // still cheaper than the best, keep going deeper, and deeper, and deeper...
  else {
    self.setEvaluatingPaths(
      () => ({
        paths: [
          {
            path: path.slice(0, path.length - 1),
            color: EVALUATING_SEGMENT_COLOR,
          },
          {
            path: path.slice(path.length - 2, path.length + 1),
            color: EVALUATING_PATH_COLOR,
          },
        ],
        cost,
      }),
      2
    );
  }

  await self.sleep();

  if (available.size === 0) {
    // at the end of the path, return where we're at
    self.setEvaluatingPaths(() => ({
      paths: [{ path: backToStart, color: EVALUATING_SEGMENT_COLOR }],
      cost,
    }));

    return [cost, backToStart];
  }

  let bestCost: number | null = null;
  let bestPath: IPoint[] | null = null;

  // for every point yet to be visited along this path
  for (const p of available) {
    // go to that point
    visitedSet.add(p);
    path.push(p);

    // RECURSE - go through all the possible points from that point
    const [curCost, curPath] = (await branchAndBoundOnCost(
      [...pointsSet],
      path,
      [...visitedSet],
      overallBest
    )) as [number, IPoint[]];

    // if that path is better and complete, keep it
    if (curCost && (!bestCost || curCost < bestCost)) {
      [bestCost, bestPath] = [curCost, curPath];

      if (!overallBest || bestCost < overallBest) {
        // found a new best complete path
        overallBest = bestCost;
        self.setBestPath(bestPath, bestCost);
      }
    }

    // go back up and make that point available again
    visitedSet.delete(p);
    path.pop();

    self.setEvaluatingPaths(
      () => ({
        paths: [{ path, color: EVALUATING_SEGMENT_COLOR }],
      }),
      2
    );
    await self.sleep();
  }

  await self.sleep();
  return [bestCost, bestPath];
};
