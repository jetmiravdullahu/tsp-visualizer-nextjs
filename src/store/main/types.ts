import { LngLat as LngLatType } from "react-map-gl";

export interface MainState {
  playing: boolean;
  definingPoints: boolean;
  nodes: LngLatType[];
  edges: LngLatType[];
  delay: number;
  algorithm: string;
}
