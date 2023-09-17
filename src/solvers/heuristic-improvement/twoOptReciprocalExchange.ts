import { totalDistance } from "../helpers";

import {
  EVALUATING_PATH_COLOR,
  EVALUATING_SEGMENT_COLOR,
} from "../../constants";
import { IPoint } from "@/store/main/types";

export const twoOptReciprocalExchange = async (path: IPoint[]) => {
  path.push(path[0]);
  let best = totalDistance(path);
  let swapped = true;

  self.setBestPath(path, best);

  while (swapped) {
    swapped = false;
    for (let pt1 = 1; pt1 < path.length - 1; pt1++) {
      for (let pt2 = pt1 + 1; pt2 < path.length - 1; pt2++) {
        // swap current pair of points
        [path[pt1], path[pt2]] = [path[pt2], path[pt1]];

        // calculate new cost
        const cost = totalDistance(path);

        self.setEvaluatingPaths(() => ({
          paths: [
            { path: path.slice(0, pt1), color: EVALUATING_SEGMENT_COLOR },
            { path: path.slice(pt1 + 1, pt2), color: EVALUATING_SEGMENT_COLOR },
            { path: path.slice(pt2 + 1), color: EVALUATING_SEGMENT_COLOR },
            {
              path: [path[pt1 - 1], path[pt1], path[pt1 + 1]],
              color: EVALUATING_PATH_COLOR,
            },
            {
              path: [path[pt2 - 1], path[pt2], path[pt2 + 1]],
              color: EVALUATING_PATH_COLOR,
            },
          ],
          cost,
        }));
        await self.sleep();

        if (cost < best) {
          // found a better path after the swap, keep it
          swapped = true;
          best = cost;
          self.setBestPath(path, best);
        } else {
          // swap back - this one's worse
          [path[pt1], path[pt2]] = [path[pt2], path[pt1]];
        }

        self.setEvaluatingPaths(() => ({
          paths: [{ path, color: EVALUATING_SEGMENT_COLOR }],
        }));

        await self.sleep();
      }
    }
  }
};
