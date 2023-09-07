"use client";

import Map from "@/components/Map";
import { selectEvaluatingPaths, selectPoints } from "@/store/main/selectors";

import { IPoint } from "@/store/main/types";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useSelector } from "react-redux";

import * as selectors from "@/store/main/selectors";
import { Edges } from "@/components/Map/Edges";

export default function Home() {
  const dispatch = useAppDispatch();

  const plotPoints = useSelector(selectors.selectPointsDisplay);
  const plotPaths = useSelector(selectors.selectEvaluatingPathsDisplay);

  const onMapClick = (node: IPoint) => {
    // if (isDefiningPoints) dispatch(addNode({ ...node }));
  };

  return (
    <main className="h-full">
      <div className="h-full">
        <Map onClick={onMapClick} nodes={plotPoints}>
          <Edges accumulator={plotPaths} />
        </Map>
      </div>
    </main>
  );
}
