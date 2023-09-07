import { IPoint } from "@/store/main/types";
import { calculateRouteCost, getDistance } from "./helpers";
import makeSolver from "./makeSolver";
import { pathCost } from "./cost";

export async function nearestNeighbor(points: IPoint[]) {
  console.log("points", points);

  const copy = [...points];

  let path = [copy.shift()] as IPoint[];
  let cost = calculateRouteCost(path);

  console.log("First path", path, cost);

  self.setEvaluatingPaths(() => ({
    paths: [{ path }],
    cost: pathCost(path),
  }));

  while (copy.length > 0) {
    copy.sort(
      (a, b) =>
        getDistance(path[path.length - 1], a) -
        getDistance(path[path.length - 1], b)
    );
    path = [...path, copy.shift()!];
    const cost = calculateRouteCost(path);

    await new Promise((resolve) => setTimeout(resolve, 100));
    self.setEvaluatingPaths(() => ({
      paths: [{ path }],
      cost: pathCost(path),
    }));
  }

  path = [...path, path[0]];
  cost = calculateRouteCost(path);

  console.log("Last path", path, cost);
  self.setEvaluatingPaths(() => ({
    paths: [{ path }],
    cost: pathCost(path),
  }));
}

makeSolver(nearestNeighbor);
