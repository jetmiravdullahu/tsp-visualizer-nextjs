import { LngLat } from "mapbox-gl";
import { getInsertionCost } from "../helpers";

const cheapestInsertion = (capitals: LngLat[]) => {
  const points = [...capitals];

  const firstItem = points[0];
  points.splice(0, 1);

  const path = [firstItem];

  path.push(path[0]);
  const pathsAnimation = [[...path]];

  while (points.length > 0) {
    let [bestCost, bestInsertionIndex, bestPointIndex]: any[] = [Infinity, null, null];

    points.forEach((point, pointIndex) => {
      for (let i = 1; i < path.length; i += 1) {
        const cost = getInsertionCost(path[i - 1], point, path[i]);
        if (cost < bestCost) {
          [bestCost, bestInsertionIndex, bestPointIndex] = [
            cost,
            i,
            pointIndex,
          ];
        }
      }
    });

    const [nextPoint] = points.splice(bestPointIndex, 1);

    path.splice(bestInsertionIndex, 0, nextPoint);
    pathsAnimation.push([...path]);
  }

  return pathsAnimation;
};

export default cheapestInsertion;
