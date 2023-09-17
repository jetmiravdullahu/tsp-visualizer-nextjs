import { IPoint } from "@/store/main/types";
import { totalDistance, calculateDistance } from "../helpers";

export const nearestNeighbor = async (points: IPoint[]) => {
  const copy = [...points];

  let path = [copy.shift()] as IPoint[];
  let cost = totalDistance(path);

  self.setEvaluatingPaths(() => ({
    paths: [{ path }],
    cost: totalDistance(path),
  }));

  while (copy.length > 0) {
    copy.sort(
      (a, b) =>
        calculateDistance(path[path.length - 1], a) -
        calculateDistance(path[path.length - 1], b)
    );
    path = [...path, copy.shift()!];
    const cost = totalDistance(path);

    await self.sleep();

    self.setEvaluatingPaths(() => ({
      paths: [{ path }],
      cost: totalDistance(path),
    }));
  }

  path = [...path, path[0]];
  cost = totalDistance(path);

  self.setBestPath(path, cost);
};
