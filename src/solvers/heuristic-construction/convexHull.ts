import { totalDistance, counterClockWise, rotateToStartingPoint } from "../helpers";
import {
  EVALUATING_PATH_COLOR,
  EVALUATING_SEGMENT_COLOR,
} from "../../constants";
import { IPoint } from "@/store/main/types";

export const convexHull = async (points: IPoint[]) => {
  const sp = points[0];

  // Find the "left most point"
  let leftmost = points[0];
  for (const p of points) {
    if (p[1] < leftmost[1]) {
      leftmost = p;
    }
  }

  const path = [leftmost];

  while (true) {
    const curPoint = path[path.length - 1];

    let selectedIdx = 0;
    let selectedPoint: IPoint | null = null;

    // find the "most counterclockwise" point
    for (let [idx, p] of points.entries()) {
      // eslint-disable-next-line
      self.setEvaluatingPaths(
        () => ({
          paths: [
            {
              path: [...path, selectedPoint || curPoint],
              color: EVALUATING_SEGMENT_COLOR,
            },
            { path: [curPoint, p], color: EVALUATING_PATH_COLOR },
          ],
        }),
        2
      );
      await self.sleep();

      if (!selectedPoint || counterClockWise(curPoint, p, selectedPoint)) {
        // this point is counterclockwise with respect to the current hull
        // and selected point (e.g. more counterclockwise)
        [selectedIdx, selectedPoint] = [idx, p];
      }
    }

    // adding this to the hull so it's no longer available
    points.splice(selectedIdx, 1);

    // back to the furthest left point, formed a cycle, break
    if (selectedPoint === leftmost) {
      break;
    }

    // add to hull
    path.push(selectedPoint!);
  }

  self.setEvaluatingPaths(() => ({
    paths: [{ path, color: EVALUATING_PATH_COLOR }],
    cost: totalDistance(path),
  }));
  await self.sleep();

  while (points.length > 0) {
    let bestRatio = Infinity;
    let bestPointIdx: number;
    let insertIdx = 0;

    for (let [freeIdx, freePoint] of points.entries()) {
      // for every free point, find the point in the current path
      // that minimizes the cost of adding the path minus the cost of
      // the original segment
      let [bestCost, bestIdx] = [Infinity, 0];
      for (let [pathIdx, pathPoint] of path.entries()) {
        const nextPathPoint = path[(pathIdx + 1) % path.length];

        // the new cost minus the old cost
        const evalCost =
          totalDistance([pathPoint, freePoint, nextPathPoint]) -
          totalDistance([pathPoint, nextPathPoint]);

        if (evalCost < bestCost) {
          [bestCost, bestIdx] = [evalCost, pathIdx];
        }
      }

      // figure out how "much" more expensive this is with respect to the
      // overall length of the segment
      const nextPoint = path[(bestIdx + 1) % path.length];
      const prevCost = totalDistance([path[bestIdx], nextPoint]);
      const newCost = totalDistance([path[bestIdx], freePoint, nextPoint]);
      const ratio = newCost / prevCost;

      if (ratio < bestRatio) {
        [bestRatio, bestPointIdx, insertIdx] = [ratio, freeIdx, bestIdx + 1];
      }
    }

    const [nextPoint] = points.splice(bestPointIdx!, 1);
    path.splice(insertIdx, 0, nextPoint);

    self.setEvaluatingPaths(() => ({
      paths: [{ path }],
      cost: totalDistance(path),
    }));
    await self.sleep();
  }

  // rotate the array so that starting point is back first
  rotateToStartingPoint(path, sp);

  // go back home
  path.push(sp);
  const cost = totalDistance(path);

  self.setEvaluatingPaths(() => ({
    paths: [{ path }],
    cost,
  }));
  self.setBestPath(path, cost);
};

