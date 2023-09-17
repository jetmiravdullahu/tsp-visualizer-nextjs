import React from "react";

import DeckGL from "@deck.gl/react/typed";
import { Map } from "react-map-gl";

import { ScatterplotLayer, PathLayer } from "@deck.gl/layers/typed";

import "mapbox-gl/dist/mapbox-gl.css";
import { IPoint } from "@/store/main/types";
import { useAppDispatch, useAppSelector } from "@/store/store";
import * as selectors from "@/store/main/selectors";
import * as reducers from "@/store/main/mainSlice";
import { PickingInfo } from "@deck.gl/core/typed";

interface IAccumulator {
  path: IPoint[];
  color: string | number[];
  width: number;
}

interface INodes {
  position: IPoint;
  color: number[];
}

type Props = {
  nodes: {
    position: number[];
    color: number[];
  }[];
  accumulator: IAccumulator[];
};

export const MapComponent: React.FC<Props> = ({ accumulator, nodes }) => {
  const dispatch = useAppDispatch();
  const token =
    "pk.eyJ1IjoiamV0bWlyOTkiLCJhIjoiY2xtOXV5Y2dpMHBwNjNldGNsdjI2ZnI2MSJ9.2phAx2WpElYZzI5ZVKqmIQ";

  const isDefiningNodes = useAppSelector(selectors.selectDefiningNodes);

  const INITIAL_VIEW_STATE = useAppSelector(selectors.selectViewport);

  const onClick = (e: PickingInfo) => {
    isDefiningNodes && dispatch(reducers.addDefinedPoint(e.coordinate!));
  };

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={{
        doubleClickZoom: false,
      }}
      layers={[
        new ScatterplotLayer({
          id: "scatterplot-layer",
          data: nodes,
          filled: true,
          radiusScale: 2,
          radiusMinPixels: 5,
          getPosition: (d: any) => d.position,
          getFillColor: (d: any) => d.color,
        }),
        new PathLayer({
          id: "path-layer",
          data: accumulator,
          getPath: (d) => d.path,
          getColor: (d) => d.color,
          pickable: true,
          widthMinPixels: 4,
          widthMaxPixels: 8,
        }),
      ]}
      onClick={onClick}
    >
      <Map
        mapboxAccessToken={token}
        // {...INITIAL_VIEW_STATE}
        mapStyle="mapbox://styles/jetmir99/clmavy9c3017e01pjdlesb2b0"
        // mapStyle="mapbox://styles/mapbox/light-v8"
      />
    </DeckGL>
  );
};
