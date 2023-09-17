import { useState, useEffect } from "react";

export const useWebWorker = (onSolverMessage: any, algorithm: string) => {
  const [worker, setWorker] = useState<Worker>();

  const resetSolver = () => {
    if (worker) {
      worker.terminate();
    }

    const workerInstance = new Worker(
      new URL("../solvers/makeSolver.ts", import.meta.url)
    );

    workerInstance.onmessage = ({ data }) => onSolverMessage(data);

    workerInstance.onerror = console.error;

    setWorker(workerInstance);
  };

  useEffect(resetSolver, [algorithm, onSolverMessage]);

  const postMessage = (data: any) => {
    if (worker) {
      worker.postMessage(data);
    }
  };

  return {
    postMessage,
    terminate: resetSolver,
  };
};
