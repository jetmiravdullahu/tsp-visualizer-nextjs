import { useState, useEffect } from "react";

export const useSolverWorker = (onSolverMessage: any, algorithm: string) => {
  const [solver, setSolver] = useState<Worker>();

  const resetSolver = () => {
    if (solver) {
      solver.terminate();
    }
    const worker = new Worker(
      new URL(
        "../solvers/heuristic-construction/convexHull.ts",
        import.meta.url
      )
    );

    worker.onmessage = ({ data }) => onSolverMessage(data);

    worker.onerror = console.error;

    setSolver(worker);
  };

  useEffect(resetSolver, [algorithm, onSolverMessage]);

  const postMessage = (data: any) => {
    if (solver) {
      solver.postMessage(data);
    }
  };

  return {
    postMessage,
    terminate: resetSolver,
  };
};
