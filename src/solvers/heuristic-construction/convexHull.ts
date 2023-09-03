import { LngLat } from "mapbox-gl";
import { counterClockWise, pathCost, rotateToStartingPoint } from "../helpers";

const convexHull = (nodes: LngLat[]) => {
  const points = [...nodes];
  const sp = points[0];

  let leftmost = points[0];
  for (const p of points) {
    if (p.lat < leftmost.lat) {
      leftmost = p;
    }
  }

  const path = [leftmost];

  const pathsAnimation: LngLat[][] = [[...path]];

  while (true) {
    const curPoint = path[path.length - 1];
    let [selectedIdx, selectedPoint]: any[] = [0, null];

    for (let [idx, p] of points.entries()) {
      if (!selectedPoint || counterClockWise(curPoint, p, selectedPoint)) {
        [selectedIdx, selectedPoint] = [idx, p];
      }
    }

    points.splice(selectedIdx, 1);

    if (selectedPoint === leftmost) {
      break;
    }

    path.push(selectedPoint);
    pathsAnimation.push([...path]);
  }

  while (points.length > 0) {
    let [bestRatio, bestPointIdx, insertIdx]: any[] = [Infinity, null, 0];

    for (let [freeIdx, freePoint] of points.entries()) {
      let [bestCost, bestIdx] = [Infinity, 0];
      for (let [pathIdx, pathPoint] of path.entries()) {
        const nextPathPoint = path[(pathIdx + 1) % path.length];

        const evalCost =
          pathCost([pathPoint, freePoint, nextPathPoint]) -
          pathCost([pathPoint, nextPathPoint]);

        if (evalCost < bestCost) {
          [bestCost, bestIdx] = [evalCost, pathIdx];
        }
      }

      const nextPoint = path[(bestIdx + 1) % path.length];
      const prevCost = pathCost([path[bestIdx], nextPoint]);
      const newCost = pathCost([path[bestIdx], freePoint, nextPoint]);
      const ratio = newCost / prevCost;

      if (ratio < bestRatio) {
        [bestRatio, bestPointIdx, insertIdx] = [ratio, freeIdx, bestIdx + 1];
      }
    }

    const [nextPoint] = points.splice(bestPointIdx, 1);
    path.splice(insertIdx, 0, nextPoint);
    pathsAnimation.push([...path]);
  }

  rotateToStartingPoint(path, sp);

  path.push(sp);
  pathsAnimation.push([...path]);
  console.log(pathsAnimation);
  return pathsAnimation
};

export default convexHull;
