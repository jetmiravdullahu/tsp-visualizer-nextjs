import { totalDistance } from "../helpers";

import {
  EVALUATING_PATH_COLOR,
  EVALUATING_SEGMENT_COLOR,
} from "../../constants";
import { IPoint } from "@/store/main/types";

const setDifference = (setA: IPoint[], setB: IPoint[]) => {
  const ret = new Set(setA);
  setB.forEach((p) => {
    ret.delete(p);
  });
  return ret;
};

export const depthFirstSearch = async (
  points: IPoint[],
  path: IPoint[] = [],
  visited: IPoint[] = [],
  overallBest: number = Infinity
): Promise<[number, IPoint[]]> => {
  let pointsSet = new Set(points);
  let visitedSet = new Set(visited);

  if (visited.length === 0) {
    // initial call
    path = [points.shift()!];
  }

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
    }),
    2
  );
  await self.sleep();

  // figure out what points are left from this point
  const available = setDifference([...pointsSet], [...visitedSet]);

  if (available.size === 0) {
    // this must be a complete path
    const backToStart = [...path, path[0]];

    // calculate the cost of this path
    const cost = totalDistance(backToStart);

    self.setEvaluatingPaths(
      () => ({
        paths: [{ path: backToStart, color: EVALUATING_SEGMENT_COLOR }],
      }),
      cost
    );

    await self.sleep();

    // return both the cost and the path where we're at
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
    const [curCost, curPath] = await depthFirstSearch(
      [...pointsSet],
      path,
      [...visitedSet],
      overallBest
    );

    // if that path is better, keep it
    if (bestCost === null || curCost < bestCost) {
      [bestCost, bestPath] = [curCost, curPath];

      if (overallBest === null || bestCost < overallBest) {
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
  return [bestCost!, bestPath!];
};
