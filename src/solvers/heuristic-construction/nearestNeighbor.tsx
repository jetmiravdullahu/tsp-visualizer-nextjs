/* eslint-disable no-restricted-globals */
import { addEdge } from "@/store/main/mainSlice";
import { getDelay, getIsPlaying, getNodes } from "@/store/main/selectors";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { LngLat } from "mapbox-gl";
import { wait } from "..";

type Props = {
  nodes: LngLat[];
};

const useNearestNeighbor = () => {
  const dispatch = useAppDispatch();

  const nodes = useAppSelector(getNodes);
  const delay = useAppSelector(getDelay);
  const isPlaying = useAppSelector(getIsPlaying);

  async function executeNearestNeighborWithDelays(): Promise<LngLat[]> {
    if(isPlaying) return []
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

  return { executeNearestNeighborWithDelays };
};

export default useNearestNeighbor;
