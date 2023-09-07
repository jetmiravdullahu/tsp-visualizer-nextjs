"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Slider } from "@/components/ui/slider";
import { MousePointer2, Check, Pause, Play, RotateCw } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { useCallback, useEffect, useRef, useState } from "react";
import { TSP } from "@/solvers";
import * as selectors from "@/store/main/selectors";
import { ReadableStream, TransformStream } from "web-streams-polyfill";

import { pause, setAlgorithm, unpause } from "@/store/main/mainSlice";
import { IPoint } from "@/store/main/types";
import { nearestNeighbor } from "@/solvers/heuristic-construction/nearestNeighbor";
import useInterval from "@/hooks/useInterval";
import { useSolverWorker } from "@/hooks/useWorker";

import * as actions from "@/store/main/actions";
import * as resolvers from "@/store/main/mainSlice";
import { useSelector } from "react-redux";

const options = [
  {
    label: "Heuristic Construction",
    value: "1",
    children: [
      {
        label: "Nearest Neighbor",
        value: TSP.NEAREST_NEIGHBOR,
      },
      {
        label: "Nearest Insertion",
        value: TSP.NEAREST_INSERTION,
      },
      {
        label: "Random Insertion",
        value: TSP.RANDOM_INSERTION,
      },
      {
        label: "Furthest Insertion",
        value: TSP.FURTHEST_INSERTION,
      },
      {
        label: "Cheapest Insertion",
        value: TSP.CHEAPEST_INSERTION,
      },
      {
        label: "Convex Hull",
        value: TSP.CONVEX_HULL,
      },
    ],
  },
  {
    label: "Heuristic Improvement",
    value: "2",
    children: [
      {
        label: "Two Opt Inversion",
        value: TSP.TWO_OPT_INVERSION,
      },
    ],
  },
  {
    label: "Exhaustive",
    value: "3",
    children: [
      {
        label: "Dynamic Programming",
        value: TSP.DYNAMIC_PROGRAMMING,
      },
      {
        label: "Depth First Search",
        value: TSP.DEPTH_FIRST_SEARCH,
      },
    ],
  },
];

export default function Hud() {
  const dispatch = useAppDispatch();

  const worker = useSolverWorker(dispatch, "test");
  const evaluatingDetailLevel = useAppSelector(
    selectors.selectEvaluatingDetailLevel
  );
  const delay = useAppSelector(selectors.selectDelay);
  const running = useAppSelector(selectors.selectRunning);
  const paused = useAppSelector(selectors.selectPaused);

  const [playing, setPlaying] = useState(false);
  const [algorithm, setAlgorithm] = useState<
    AsyncGenerator<
      {
        path: IPoint[];
        cost: number;
      },
      void,
      unknown
    >
  >();

  const points = useSelector(selectors.selectPoints);
  let resumePromise: any = Promise.resolve();

  // useEffect(() => {
  //   const runGeneratorWithDelay = async () => {
  //     if (algorithm === undefined) return;

  //     let result = await algorithm.next();

  //     while (result.done === false && playing) {
  //       console.log({ playing });

  //       await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust the delay as needed
  //       dispatch(setPath({ path: result.value.path, cost: result.value.cost }));

  //       if (result.done) {
  //         setAlgorithm(undefined);
  //         return;
  //       }

  //       result = await algorithm.next();
  //     }
  //   };

  //   runGeneratorWithDelay();
  // }, [algorithm, dispatch, playing]);

  const onChange = (e: string) => {
    // if (isValidAlgorithm(e)) dispatch(setAlgorithm(e));
  };

  const onSlideChange = (event: number[]) => {
    dispatch(resolvers.setDelay(event[0]));
    worker.postMessage(actions.setDelay(event[0]));
  };

  const onStart = useCallback(() => {
    console.log("onStart");
    dispatch(resolvers.startSolving());
    worker.postMessage(
      actions.startSolvingAction(points, delay, evaluatingDetailLevel)
    );
  }, [worker, dispatch, points, delay, evaluatingDetailLevel]);

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

  // const onStart = async (nodes: IPoint[]) => {
  //   // worker.postMessage(actions.startSolvingAction(nodes, 100, 1));
  //   // console.log("onStart", { playing });
  //   // if (playing) {
  //   //   setPlaying(false);
  //   //   return;
  //   // } else {
  //   //   const gen = nearestNeighbor(nodes);
  //   //   setAlgorithm(gen);
  //   //   setPlaying(true);
  //   // }
  //   // for await (const newRoute of stream) {
  //   //   // setRoute(newRoute);
  //   //   dispatch(setPath({ path: newRoute.path, cost: newRoute.cost }));
  //   // }
  //   // const worker = new Worker(
  //   //   new URL("../../solvers/tspWorker.ts", import.meta.url)
  //   // );
  //   // worker.postMessage(nodes);
  //   // worker.onmessage = (e) => {
  //   //   dispatch(setPath({ path: e.data.path, cost: e.data.cost }));
  //   // };
  // };

  // console.log({ nodes });

  const onToggleDefiningPoints = () => {
    // dispatch(toggleDefiningPoints());
    // dispatch(setDelay(0));
    // dispatch(setTimeStamp(0));
    // dispatch(setAccumulator(undefined));
  };

  return (
    <main>
      <div className="absolute top-10 left-10">
        <Button onClick={onToggleDefiningPoints} className="bg-background/90">
          {!true ? <MousePointer2 /> : <Check />}
        </Button>
      </div>
      <div className="absolute top-10 left-[50%] -translate-x-1/2">
        <Combobox
          options={options}
          onChange={onChange}
          value={"asfasf"}
          inputClass="w-[15rem]"
          popoverClass="w-[15rem]"
          inputPlaceholder="Search an option"
          placeholder="Chose an option"
        />
      </div>
      <div className="absolute top-10 right-10 w-1/6 bg-background/90 flex flex-col gap-2 px-10 py-10 rounded-xl">
        <div className="w-full flex justify-between">
          <div>CURRENT BEST:</div>

          <span>1</span>
        </div>
        <div className="w-full flex justify-between">
          <div>EVALUATING:</div>

          <span>{0} KM</span>
        </div>
        <div className="w-full flex justify-between">
          <div>RUNNING FOR:</div>

          <span>1</span>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-background/90 h-14 flex justify-between items-center gap-20 px-10 py-1 rounded-full">
        <div className="h-full flex gap-5">
          <Button
            onClick={onToggleStart}
            className="bg-transparent text-foreground hover:text-primary hover:bg-secondary/50 h-full"
          >
            {!running ? <Play /> : <Pause />}
          </Button>
          <Button
            onClick={onReset}
            className="bg-transparent text-foreground hover:text-primary hover:bg-secondary/50 h-full"
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
