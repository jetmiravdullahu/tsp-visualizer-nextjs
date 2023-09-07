import { TSP } from "@/solvers";
import { LngLat as LngLatType } from "react-map-gl";

export interface IMainState {
  points: IPoint[];
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
  definingPoints: boolean;

  siteInfoOpen: boolean;
  algInfoOpen: boolean;
}

export interface IPoint {
  lat: number;
  lng: number;
}

export interface IViewport {
  latitude: number;
  longitude: number;
  zoom: number;
}
