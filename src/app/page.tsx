"use client";

import { IPoint } from "@/store/main/types";
import { useAppSelector } from "@/store/store";

import * as selectors from "@/store/main/selectors";
import { MapComponent } from "@/components/Map";

export default function Home() {

  const plotPoints = useAppSelector(selectors.selectNodesDisplay);
  const plotPaths = useAppSelector(selectors.selectPlotPaths);

  const onMapClick = (node: IPoint) => {
    // if (isDefiningPoints) dispatch(addNode({ ...node }));
  };

  return (
    <main className="h-full">
      <div className="h-full">
        {/* <Map onClick={onMapClick} nodes={plotPoints} accumulator={plotPaths} /> */}
        <MapComponent nodes={plotPoints} accumulator={plotPaths} />
      </div>
    </main>
  );
}
