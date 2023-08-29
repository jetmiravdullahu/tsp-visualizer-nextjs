"use client";

import { useState} from "react";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Slider } from "@/components/ui/slider";
import { Pause, Play, RotateCw } from "lucide-react";

import "./globals.css";
import type { Metadata } from "next";


const options = [
  {
    label: "Group 1",
    value: "1",
    children: [
      {
        label: "asd",
        value: "asd",
      },
      {
        label: "fgh",
        value: "fgh",
      },
    ],
  },
  {
    label: "Group 2",
    value: "2",
    children: [
      {
        label: "jkl",
        value: "jkl",
      },
      {
        label: "qwe",
        value: "qwe",
      },
    ],
  },
  {
    label: "Group 3",
    value: "3",
    children: [
      {
        label: "rty",
        value: "rty",
      },
      {
        label: "uio",
        value: "uio",
      },
    ],
  },
  {
    label: "Group 4",
    value: "4",
    children: [
      {
        label: "zxc",
        value: "zxc",
      },
      {
        label: "vbn",
        value: "vbn",
      },
    ],
  },
];

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  hud,
}: {
  children: React.ReactNode;
  hud: React.ReactNode;
}) {
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
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={"relative text-foreground bg-background font-pt"}
      >
        <div className="h-screen">{children}</div>
        {/* <div className="h-screen w-screen overflow-hidden absolute inset-0">{hud}</div> */}
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
        <div className="absolute top-10 left-[50%] -translate-y-1/2 -translate-x-1/2">
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
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-background/90 h-14 flex justify-between items-center gap-20 px-10 py-1 rounded-full">
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
      </body>
    </html>
  );
}
