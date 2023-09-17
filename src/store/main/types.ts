import { LngLat as LngLatType } from "react-map-gl";

export interface IMainState {
  nodes: IPoint[];
  viewport: IViewport;
  algorithm: string;
  delay: number;
  evaluatingDetailLevel: number;
  maxEvaluatingDetailLevel: number;
  showBestPath: boolean;

  bestPath: IPoint[];
  bestDisplaySegments: IPoint[];
  bestCost: number | null;

  evaluatingPaths: { path: IPoint[]; color?: string }[];
  evaluatingCost: number | null;
  running: boolean;
  fullSpeed: boolean;
  paused: boolean;
  startedRunningAt: number | null;

  pointCount: number;
  definingNodes: boolean;
}

export interface IPoint extends Array<number> {}

export interface IViewport {
  latitude: number;
  longitude: number;
  zoom: number;
}
