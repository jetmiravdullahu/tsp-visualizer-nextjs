"use client";

import Map from "@/components/Map";
import { Button } from "@/components/ui/button";
import useInterval from "@/hooks/useInterfal";
import {
  TSP,
  cheapestInsertion,
  convexHull,
  depthFirstSearch,
  dynamicProgramming,
  furthestInsertion,
  nearestInsertion,
  nearestNeighbor,
  // random,
  randomInsertion,
  twoOptInversion,
} from "@/solvers";
import { totalPathCost } from "@/solvers/helpers";
import {
  setAccumulator,
  addNode,
  setDelay,
  setEdges,
  setTimeStamp,
  setDistance,
} from "@/store/main/mainSlice";
import {
  getAccumulator,
  getAlgorithm,
  getDelay,
  getEdges,
  getIsDefiningPoints,
  getIsPlaying,
  getNodes,
  getTimeStamp,
} from "@/store/main/selectors";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Check, MousePointer2 } from "lucide-react";
import { useEffect } from "react";
import { LngLat as LngLatType } from "react-map-gl";

export default function Home() {
  const dispatch = useAppDispatch();

  const isPlaying = useAppSelector(getIsPlaying);
  const isDefiningPoints = useAppSelector(getIsDefiningPoints);
  const delay = useAppSelector(getDelay);
  const algorithm = useAppSelector(getAlgorithm);
  const nodes = useAppSelector(getNodes);
  const edges = useAppSelector(getEdges);
  const timeStamp = useAppSelector(getTimeStamp);
  const accumulator = useAppSelector(getAccumulator);

  useEffect(() => {
    switch (algorithm) {
      case TSP.NEAREST_NEIGHBOR:
        dispatch(setEdges(nearestNeighbor(nodes)));
        break;
      case TSP.NEAREST_INSERTION:
        dispatch(setEdges(nearestInsertion(nodes)));
        break;
      case TSP.RANDOM_INSERTION:
        dispatch(setEdges(randomInsertion(nodes)));
        break;
      case TSP.FURTHEST_INSERTION:
        dispatch(setEdges(furthestInsertion(nodes)));
        break;
      case TSP.CHEAPEST_INSERTION:
        dispatch(setEdges(cheapestInsertion(nodes)));
        break;
      case TSP.CONVEX_HULL:
        dispatch(setEdges(convexHull(nodes)));
        break;
      case TSP.TWO_OPT_INVERSION:
        dispatch(setEdges(twoOptInversion(nodes)));
        break;
      // case TSP.DYNAMIC_PROGRAMMING:
      //   dispatch(setEdges(dynamicProgramming(nodes)));
      //   break;
      // case TSP.DEPTH_FIRST_SEARCH:
      //   //@ts-ignore
      //   dispatch(setEdges(depthFirstSearch(nodes)[1]));
      //   break;
      default:
        break;
    }
  }, [algorithm, nodes, dispatch]);

  useInterval(() => {
    if (!edges[timeStamp]) {
      dispatch(setDelay(0));
      dispatch(setTimeStamp(0));
      dispatch(setAccumulator(undefined));
    } else {
      dispatch(setAccumulator(edges[timeStamp]));

      const distance = totalPathCost(accumulator);

      dispatch(setTimeStamp(timeStamp + 1));

      dispatch(setDistance(distance));
    }
  }, delay || null);

  const onMapClick = (node: LngLatType) => {
    if (isDefiningPoints) dispatch(addNode(node));
  };

  console.log(accumulator, edges);

  return (
    <main className="h-full relative">
      <div className="h-full relative">
        <div className="absolute top-10 left-10">
          <Button onClick={() => {}} className="bg-background/90">
            {!isDefiningPoints ? <MousePointer2 /> : <Check />}
          </Button>
        </div>
        <Map onClick={onMapClick} nodes={nodes} accumulator={accumulator} />
      </div>
    </main>
  );
}
