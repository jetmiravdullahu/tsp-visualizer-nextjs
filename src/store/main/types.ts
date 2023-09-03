import { TSP } from "@/solvers";
import { LngLat as LngLatType } from "react-map-gl";

export interface MainState {
  playing: boolean;
  definingPoints: boolean;
  nodes: LngLatType[];
  edges: LngLatType[][];
  delay: number | undefined;
  algorithm: keyof typeof TSP;
  timeStamp: number;
  accumulator: LngLatType[];
  distance: number;
}
