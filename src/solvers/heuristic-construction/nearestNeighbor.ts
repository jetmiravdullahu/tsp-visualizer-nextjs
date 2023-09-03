import { LngLat } from "mapbox-gl";

const nearestNeighbor = (capitals: LngLat[]) => {
  const points = [...capitals];

  const firstItem = points[0];
  points.splice(0, 1);

  const path = [firstItem];
  const pathsAnimation: LngLat[][] = [[...path]];

  while (points.length > 0) {
    points.sort(
      (a, b) =>
        path[path.length - 1].distanceTo(b) -
        path[path.length - 1].distanceTo(a)
    );

    path.push(points.pop()!);
    pathsAnimation.push([...path]);
  }

  path.push(path[0]);
  pathsAnimation.push([...path]);
  return pathsAnimation;
};

export default nearestNeighbor;
