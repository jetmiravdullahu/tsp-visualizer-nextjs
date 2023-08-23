"use client";

import { useState, ChangeEvent, FormEventHandler, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Slider } from "@/components/ui/slider";
import { Check, Pause, Play, RotateCw } from "lucide-react";

const options = [
  {
    label: "Group 1",
    value: "1",
    children: [
      {
        label: "Option 1",
        value: "option 1",
      },
      {
        label: "Option 2",
        value: "option 2",
      },
    ],
  },
  {
    label: "Group 2",
    value: "2",
    children: [
      {
        label: "Option 3",
        value: "option 3",
      },
      {
        label: "Option 4",
        value: "option 4",
      },
    ],
  },
  {
    label: "Group 2",
    value: "2",
    children: [
      {
        label: "Option 3",
        value: "option 3",
      },
      {
        label: "Option 4",
        value: "option 4",
      },
    ],
  },
  {
    label: "Group 2",
    value: "2",
    children: [
      {
        label: "Option 3",
        value: "option 3",
      },
      {
        label: "Option 4",
        value: "option 4",
      },
    ],
  },
];

export default function Home() {
  const [value, setValue] = useState("option 2");
  const [slider, setSlider] = useState([0]);
  const [play, setPlay] = useState(false);

  const onChange = (e: string) => {
    setValue(e === value ? "" : e);
  };

  const onSlideChange = (event: number[]) => {
    setSlider(event);
  };

  return (
    <main>
      <div className="fixed top-10 right-10 w-1/6 bg-primary/5 flex flex-col gap-2 px-10 py-10 rounded-xl">
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
      <div className="fixed top-10 left-[50%] -translate-y-1/2 -translate-x-1/2">
        <Combobox
          options={options}
          onChange={onChange}
          value={value}
          inputClass="w-[15rem]"
          popoverClass="w-[15rem]"
          inputPlaceholder="Search an option"
          placeholder="Chose an option"
        />
      </div>
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-primary/5 h-14 flex justify-between items-center gap-20 px-10 py-1 rounded-full">
        <div className="h-full flex gap-5">
          <Button
            onClick={() => setPlay(!play)}
            className="bg-transparent text-foreground hover:text-primary hover:bg-secondary/50 h-full"
          >
            {!play ? <Play /> : <Pause />}
          </Button>
          <Button className="bg-transparent text-foreground hover:text-primary hover:bg-secondary/50 h-full">
            <RotateCw />
          </Button>
        </div>
        <div>
          <Slider
            defaultValue={[50]}
            value={slider}
            
            max={100}
            step={1}
            onValueChange={onSlideChange}
            className="w-48 cursor-pointer"
          />
        </div>
      </div>
    </main>
  );
}
