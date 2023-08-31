import { addEdge } from "@/store/main/mainSlice";
import { LngLat } from "mapbox-gl";
import { wait } from "..";

async function executeNearestNeighborWithDelays(nodes: LngLat[], dispatch: any, delay: number): Promise<LngLat[]> {
  const copiedNodes = [...nodes];
  const path: LngLat[] = [copiedNodes.shift()!];
  dispatch(addEdge(path[0]));

  while (copiedNodes.length > 0) {
    copiedNodes.sort(
      (a, b) =>
        path[path.length - 1]!.distanceTo(b) -
        path[path.length - 1]!.distanceTo(a)
    );

    await wait(delay);

    const nextNode = copiedNodes.pop();
    if (nextNode) {
      path.push(nextNode);
      dispatch(addEdge(nextNode));
    }
  }

  await wait(delay);

  path.push(path[0]);
  dispatch(addEdge(path[0]));

  return path;
}
