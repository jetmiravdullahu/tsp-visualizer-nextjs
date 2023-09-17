import { totalDistance, calculateDistance } from "../helpers";
import { IPoint } from "@/store/main/types";

export const nearestInsertion = async (points: IPoint[]) => {
  // from the starting point
  const path = [points.shift()!];

  //
  // INITIALIZATION - go to the nearest point first
  //
  points.sort((a, b) => calculateDistance(path[0], b) - calculateDistance(path[0], a));
  path.push(points.pop()!);

  self.setEvaluatingPaths(() => ({
    paths: [{ path }],
    cost: totalDistance(path),
  }));

  await self.sleep();

  while (points.length > 0) {
    //
    // SELECTION - nearest point to the path
    //
    let selectedDistance = Infinity;
    let selectedIdx: number | null = null;

    for (const [freePointIdx, freePoint] of points.entries()) {
      for (const pathPoint of path) {
        const dist = calculateDistance(freePoint, pathPoint);
        if (dist < selectedDistance) {
          [selectedDistance, selectedIdx] = [dist, freePointIdx];
        }
      }
    }

    // get the next point to add
    const [nextPoint] = points.splice(selectedIdx!, 1);

    //
    // INSERTION - find the insertion spot that minimizes distance
    //
    let bestCost = Infinity;
    let bestIdx: number | null = null;

    for (let i = 1; i < path.length; i++) {
      const insertionCost = totalDistance([path[i - 1], nextPoint, path[i]]);
      if (insertionCost < bestCost) {
        [bestCost, bestIdx] = [insertionCost, i];
      }
    }
    path.splice(bestIdx!, 0, nextPoint);

    self.setEvaluatingPaths(() => ({
      paths: [{ path }],
      cost: totalDistance(path),
    }));

    await self.sleep();
  }

  // return to start after visiting all other points
  path.push(path[0]);
  const cost = totalDistance(path);

  self.setEvaluatingPaths(() => ({
    paths: [{ path }],
    cost,
  }));
  await self.sleep();

  self.setBestPath(path, cost);
};
