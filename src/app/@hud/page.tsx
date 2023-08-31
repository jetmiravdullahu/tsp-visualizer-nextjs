"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Slider } from "@/components/ui/slider";
import { MousePointer2, Check, Pause, Play, RotateCw } from "lucide-react";
import {
  getAlgorithm,
  getDelay,
  getEdges,
  getIsDefiningPoints,
  getIsPlaying,
  getNodes,
} from "../../store/main/selectors";
import {
  resetNodes,
  setAlgorithm,
  setDelay,
  toggleDefiningPoints,
  togglePlay,
} from "../../store/main/mainSlice";
import useNearestNeighbor from "@/solvers/heuristic-construction/nearestNeighbor";
import { useAppDispatch, useAppSelector } from "@/store/store";

const options = [
  {
    label: "Heuristic Construction",
    value: "1",
    children: [
      {
        label: "Nearest Neighbor",
        value: "1",
      },
    ],
  },
];

export default function Hud() {

  const dispatch = useAppDispatch();

  const isPlaying = useAppSelector(getIsPlaying);
  const isDefiningPoints = useAppSelector(getIsDefiningPoints);
  const delay = useAppSelector(getDelay);
  const algorithm = useAppSelector(getAlgorithm);
  const nodes = useAppSelector(getNodes);
  const edges = useAppSelector(getEdges);

  const { executeNearestNeighborWithDelays } = useNearestNeighbor();

  const onChange = (e: string) => {
    dispatch(setAlgorithm(e));
  };

  const onSlideChange = (event: number[]) => {
    dispatch(setDelay(event[0]));
  };

  const onStart = async () => {
    dispatch(togglePlay());
    if (!isPlaying) {
      await executeNearestNeighborWithDelays();
    }
  };
  return (
    <main>
      <div className="absolute top-10 left-10">
        <Button
          onClick={() => dispatch(toggleDefiningPoints())}
          className="bg-background/90"
          disabled={isPlaying}
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

          <span>1</span>
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
            onClick={() => dispatch(resetNodes())}
            className="bg-transparent text-foreground hover:text-primary hover:bg-secondary/50 h-full"
            disabled={isDefiningPoints || isPlaying}
          >
            <RotateCw />
          </Button>
        </div>
        <div>
          <Slider
            defaultValue={[0]}
            value={[delay]}
            max={250}
            min={0}
            step={25}
            disabled={isDefiningPoints}
            onValueChange={onSlideChange}
            className="w-48 cursor-pointer"
          />
        </div>
      </div>
    </main>
  );
}
