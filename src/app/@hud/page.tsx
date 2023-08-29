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
      
    </main>
  );
}
