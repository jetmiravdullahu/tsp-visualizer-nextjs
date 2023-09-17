"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MousePointer2, Check, Pause, Play, RotateCw } from "lucide-react";

import { Combobox, IComboBoxOption } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

import { useAppDispatch, useAppSelector } from "@/store/store";
import * as selectors from "@/store/main/selectors";
import * as actions from "@/store/main/actions";
import * as resolvers from "@/store/main/mainSlice";

import { useWebWorker } from "@/hooks/useWorker";

import { SOLVERS } from "@/solvers";

export default function Hud() {
  const dispatch = useAppDispatch();

  const evaluatingDetailLevel = useAppSelector(
    selectors.selectEvaluatingDetailLevel
  );
  const delay = useAppSelector(selectors.selectDelay);
  const running = useAppSelector(selectors.selectRunning);
  const paused = useAppSelector(selectors.selectPaused);
  const nodes = useAppSelector(selectors.selectNodes);
  const isDefiningNodes = useAppSelector(selectors.selectDefiningNodes);
  const bestCost = useAppSelector(selectors.selectBestCostDisplay);
  const evaluating = useAppSelector(selectors.selectEvaluatingCostDisplay);
  const startedRunningAt = useAppSelector(selectors.selectStartedRunningAt);

  const [runningFor, setRunningFor] = useState(0);

  useEffect(() => {
    if (startedRunningAt) {
      const interval = setInterval(() => {
        setRunningFor(Math.floor((Date.now() - startedRunningAt) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startedRunningAt]);

  const [algorithm, setAlgorithm] =
    useState<keyof typeof SOLVERS>("NEAREST_NEIGHBOR");
  const worker = useWebWorker(dispatch, algorithm);

  const onChange = (e: string) => {
    setAlgorithm(e as keyof typeof SOLVERS);

    dispatch(resolvers.stopSolving());
    dispatch(resolvers.resetBestPathState());
    dispatch(resolvers.resetEvaluatingState());
    worker.terminate();
  };

  const onSlideChange = (event: number[]) => {
    dispatch(resolvers.setDelay(event[0]));
    worker.postMessage(actions.setDelay(event[0]));
  };

  const onStart = useCallback(() => {
    dispatch(resolvers.startSolving());
    worker.postMessage(
      actions.startSolvingAction(nodes, delay, evaluatingDetailLevel, algorithm)
    );
  }, [worker, dispatch, nodes, delay, evaluatingDetailLevel, algorithm]);

  const onPause = useCallback(() => {
    dispatch(resolvers.pause());
    worker.postMessage(actions.pause());
  }, [worker, dispatch]);

  const onUnpause = useCallback(() => {
    dispatch(resolvers.unpause());
    worker.postMessage(actions.unpause());
  }, [worker, dispatch]);

  const onToggleStart = () => {
    if (!running && !paused) {
      onStart();
    } else {
      if (paused) {
        onUnpause();
      } else {
        onPause();
      }
    }
  };

  const onReset = useCallback(() => {
    dispatch(resolvers.stopSolving());
    dispatch(resolvers.resetBestPathState());
    dispatch(resolvers.resetEvaluatingState());
    worker.terminate();
  }, [worker, dispatch]);

  const onToggleDefiningPoints = () => {
    if (!isDefiningNodes) {
      onReset();
      dispatch(resolvers.startDefiningNodes());
    } else {
      dispatch(resolvers.stopDefiningNodes());
    }
  };

  const generateAlgorithmOptions = useMemo(() => {
    const groups = Object.entries(SOLVERS).reduce((acc, [key, solver]) => {
      const { category } = solver;

      if (!acc[category]) {
        acc[category] = {
          label: category,
          options: [],
        };
      }

      acc[category].options.push({
        value: key,
        label: solver.name,
      });

      return acc;
    }, {} as any);

    return Object.values(groups).map((g: any) => ({
      ...g,
      children: g.options,
    }));
  }, []);

  return (
    <main>
      <div className="absolute top-10 left-10">
        <Button onClick={onToggleDefiningPoints} className="bg-background/90">
          {!isDefiningNodes ? <MousePointer2 /> : <Check />}
        </Button>
      </div>
      <div className="absolute top-10 left-[50%] -translate-x-1/2">
        <Combobox
          options={generateAlgorithmOptions}
          onChange={onChange}
          value={algorithm}
          disabled={running && !paused}
          inputClass="w-[15rem]"
          popoverClass="w-[15rem]"
          inputPlaceholder="Search an option"
          placeholder="Chose an option"
        />
      </div>
      <div className="absolute top-10 right-10 w-1/6 bg-background/90 flex flex-col gap-2 px-10 py-10 rounded-xl">
        <div className="w-full flex justify-between">
          <div>CURRENT BEST:</div>

          <span>{bestCost || ""} KM</span>
        </div>
        <div className="w-full flex justify-between">
          <div>EVALUATING:</div>

          <span>{evaluating || ""} KM</span>
        </div>
        <div className="w-full flex justify-between">
          <div>RUNNING FOR:</div>

          <span>{runningFor || ""} S</span>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-background/90 h-14 flex justify-between items-center gap-20 px-10 py-1 rounded-full">
        <div className="h-full flex gap-5">
          <Button
            onClick={onToggleStart}
            className="bg-transparent text-foreground hover:text-primary hover:bg-secondary/50 h-full"
          >
            {paused ? <Play /> : running ? <Pause /> : <Play />}
          </Button>
          <Button
            onClick={onReset}
            className="bg-transparent text-foreground hover:text-primary hover:bg-secondary/50 h-full"
            disabled={running}
          >
            <RotateCw />
          </Button>
        </div>
        <div>
          <Slider
            value={[delay]}
            max={250}
            min={0}
            step={1}
            onValueChange={onSlideChange}
            className="w-48 cursor-pointer"
          />
        </div>
      </div>
    </main>
  );
}
