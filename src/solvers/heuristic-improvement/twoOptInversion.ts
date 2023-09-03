import { LngLat } from "mapbox-gl";
import { pathCost } from "../helpers";

const twoOptInversion = (nodes: LngLat[]) => {
  const path = [...nodes];
  path.push(path[0]);
  const pathsAnimation: LngLat[][] = [[...path]];
  let best = pathCost(path);
  let swapped = true;

  while (swapped) {
    swapped = false;
    for (let pt1 = 1; pt1 < path.length - 1; pt1++) {
      for (let pt2 = pt1 + 1; pt2 < path.length - 1; pt2++) {
        // section of the path to reverse
        const section = path.slice(pt1, pt2 + 1);

        // reverse section in place
        section.reverse();

        // replace section of path with reversed section in place
        path.splice(pt1, pt2 + 1 - pt1, ...section);
        pathsAnimation.push([...path]);

        // calculate new cost
        const newPath = path;
        const cost = pathCost(newPath);

        if (cost < best) {
          // found a better path after the swap, keep it
          swapped = true;
          best = cost;
        } else {
          // un-reverse the section
          section.reverse();
          path.splice(pt1, pt2 + 1 - pt1, ...section);
          pathsAnimation.push([...path]);
        }
      }
    }
  }

  return pathsAnimation
};

export default twoOptInversion
