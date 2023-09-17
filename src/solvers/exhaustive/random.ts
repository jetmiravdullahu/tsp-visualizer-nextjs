import { totalDistance } from "../helpers";
import { IPoint } from "@/store/main/types";

export const random = async (points: IPoint[]) => {
  let best = Infinity;

  while (true) {
    // save off the starting point
    const start = points.shift()!;

    // sort the remaining points
    const path = points.sort(() => Math.random() - 0.5);

    // put the starting point back
    path.unshift(start);

    // return to the starting point
    path.push(start);

    // calculate the new cost
    const cost = totalDistance(path);

    if (cost < best) {
      // we found a better path
      best = cost;
      self.setBestPath(path, cost);
    }

    self.setEvaluatingPaths(() => ({
      paths: [{ path }],
      cost,
    }));

    // get rid of starting point at the end
    path.pop();
    await self.sleep();
  }
};
