import { totalDistance, calculateDistance } from "../helpers";
import { IPoint } from "@/store/main/types";

export const arbitraryInsertion = async (points: IPoint[]) => {
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

  // randomly sort points - this is the order they will be added
  // to the path
  points.sort(() => Math.random() - 0.5);

  while (points.length > 0) {
    //
    // SELECTION - choose a next point randomly
    //
    const nextPoint = points.pop()!;

    //
    // INSERTION - find the insertion spot that minimizes distance
    //

    let bestCost = Infinity;
    let bestIdx: number;

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
