interface Window {
  solverConfig: {
    detailLevel: number;
    evaluatingDetailLevel?: number;
    delay: number;
    fullSpeed: boolean;
    paused: boolean;
  };
  setBestPath: (path: any, cost: any) => void;
  setEvaluatingPaths: (
    getPaths: () => { paths: any; cost?: any },
    level?: number
  ) => void;
  waitPause: () => Promise<void>;
  sleep: () => Promise<void>;
}
