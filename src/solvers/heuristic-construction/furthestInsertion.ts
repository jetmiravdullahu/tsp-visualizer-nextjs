import { LngLat } from "mapbox-gl";
import { computeCost, getInsertionCost, pathCost, totalPathCost } from "../helpers";

const furthestInsertion = (nodes: LngLat[]) => {
  const points = [...nodes];
  const path: LngLat[] = [points.shift()!];

  const pathsAnimation: LngLat[][] = [[...path]];

  points.sort((a, b) => path[0].distanceTo(b) - path[0].distanceTo(a));
  path.push(points.pop()!);
  pathsAnimation.push([...path]);

  while (points.length > 0) {
    let [selectedDistance, selectedIdx] = [0, null];
    for (const [freePointIdx, freePoint] of points.entries()) {
      // find the minimum distance to the path for freePoint
      let [bestCostToPath, costToPathIdx]: any[] = [Infinity, null];
      for (const pathPoint of path) {
        const dist = freePoint.distanceTo(pathPoint);
        if (dist < bestCostToPath) {
          [bestCostToPath, costToPathIdx] = [dist, freePointIdx];
        }
      }

      // if this point is further from the path than the currently selected
      if (bestCostToPath > selectedDistance) {
        [selectedDistance, selectedIdx] = [bestCostToPath, costToPathIdx];
      }
    }

    // get the next point to add
    const [nextPoint] = points.splice(selectedIdx!, 1);

    //
    // INSERTION - find the insertion spot that minimizes distance
    //
    let [bestCost, bestIdx]: any[] = [Infinity, null];
    for (let i = 1; i < path.length; i++) {
      const insertionCost = pathCost([path[i - 1], nextPoint, path[i]]);
      if (insertionCost < bestCost) {
        [bestCost, bestIdx] = [insertionCost, i];
      }
    }
    path.splice(bestIdx, 0, nextPoint);
    pathsAnimation.push([...path]);
  }

  // return to start after visiting all other points
  path.push(path[0]);
  pathsAnimation.push([...path]);

  return pathsAnimation;
};

export default furthestInsertion;
