import { LngLat } from "mapbox-gl";
import { computeCost } from "../helpers";

const nearestInsertion = (capitals: LngLat[]) => {
  const points = [...capitals];

  const firstItem = points[0];
  points.splice(0, 1);

  const path = [firstItem];
  path.push(path[0]);
  const pathsAnimation = [[...path]];

  while (points.length > 0) {
    let [closestPointIndex, closestDistance] = [null, Infinity];

    points.forEach((point, pointIndex) => {
      let [minimumCost, minimumCostId]: any[] = [Infinity, null];

      path.forEach((pathPoint) => {
        const dist = pathPoint.distanceTo(point);

        if (dist < minimumCost) {
          minimumCostId = pointIndex;
          minimumCost = dist;
        }
      });

      if (minimumCost < closestDistance) {
        [closestPointIndex, closestDistance] = [minimumCostId, minimumCost];
      }
    });

    const [nextPoint] = points.splice(closestPointIndex!, 1);

    const bestPointIndex = computeCost(path, nextPoint);

    path.splice(bestPointIndex, 0, nextPoint);
    pathsAnimation.push([...path]);
  }

  return pathsAnimation;
};

export default nearestInsertion;
