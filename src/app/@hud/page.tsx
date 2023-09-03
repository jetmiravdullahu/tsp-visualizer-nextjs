"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Slider } from "@/components/ui/slider";
import { MousePointer2, Check, Pause, Play, RotateCw } from "lucide-react";
import {
  getAlgorithm,
  getDelay,
  getDistance,
  getIsDefiningPoints,
  getIsPlaying,
  getNodes,
} from "../../store/main/selectors";
import {
  setAccumulator,
  setAlgorithm,
  setDelay,
  setTimeStamp,
  toggleDefiningPoints,
  togglePlay,
} from "../../store/main/mainSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRef } from "react";
import { TSP } from "@/solvers";
import { isValidAlgorithm } from "@/helpers";

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
  const worker = useRef();
  const dispatch = useAppDispatch();

  const isPlaying = useAppSelector(getIsPlaying);
  const isDefiningPoints = useAppSelector(getIsDefiningPoints);
  const delay = useAppSelector(getDelay);
  const algorithm = useAppSelector(getAlgorithm);
  const nodes = useAppSelector(getNodes);
  const distance = useAppSelector(getDistance);

  const onChange = (e: string) => {
    if (isValidAlgorithm(e)) dispatch(setAlgorithm(e));
  };

  const onSlideChange = (event: number[]) => {
    dispatch(setDelay(event[0]));
  };

  const onStart = () => {
    dispatch(togglePlay());
  };
  const onReset = () => {
    dispatch(setDelay(undefined));
    dispatch(setTimeStamp(0));
    dispatch(setAccumulator(undefined));
  };

  const onToggleDefiningPoints = () => {
    dispatch(toggleDefiningPoints());
    dispatch(setDelay(undefined));
    dispatch(setTimeStamp(0));
    dispatch(setAccumulator(undefined));
    
  }

  return (
    <main>
      <div className="absolute top-10 left-10">
        <Button
          onClick={onToggleDefiningPoints}
          className="bg-background/90"
        >
          {!isDefiningPoints ? <MousePointer2 /> : <Check />}
        </Button>
      </div>
      <div className="absolute top-10 left-[50%] -translate-x-1/2">
        <Combobox
          options={options}
          onChange={onChange}
          value={algorithm}
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

          <span>{distance} KM</span>
        </div>
        <div className="w-full flex justify-between">
          <div>RUNNING FOR:</div>

          <span>1</span>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-background/90 h-14 flex justify-between items-center gap-20 px-10 py-1 rounded-full">
        <div className="h-full flex gap-5">
          <Button
            onClick={onStart}
            className="bg-transparent text-foreground hover:text-primary hover:bg-secondary/50 h-full"
            disabled={isDefiningPoints || !nodes.length}
          >
            {!isPlaying ? <Play /> : <Pause />}
          </Button>
          <Button
            onClick={onReset}
            className="bg-transparent text-foreground hover:text-primary hover:bg-secondary/50 h-full"
            disabled={isDefiningPoints || isPlaying}
          >
            <RotateCw />
          </Button>
        </div>
        <div>
          <Slider
            defaultValue={[0]}
            value={[delay || 0]}
            max={250}
            min={0}
            step={1}
            disabled={isDefiningPoints}
            onValueChange={onSlideChange}
            className="w-48 cursor-pointer"
          />
        </div>
      </div>
    </main>
  );
}
