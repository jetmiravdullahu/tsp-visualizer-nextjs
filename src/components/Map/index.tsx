"use client";
import { useEffect, useState } from "react";
import {
  CircleLayer,
  Layer,
  LineLayer,
  Source,
  LngLat as LngLatType,
  Map as MapBox,
} from "react-map-gl";
import { LngLat } from "mapbox-gl";

import type { FeatureCollection } from "geojson";
import { Button } from "../ui/button";
import { IPoint } from "@/store/main/types";

import "mapbox-gl/dist/mapbox-gl.css";

interface Props {
  nodes: { position: IPoint; color: number[] }[];
  onClick: (node: IPoint) => void;
  children?: React.ReactNode;
}

const Map: React.FC<Props> = ({ nodes, onClick, children }) => {
  const token =
    "pk.eyJ1IjoiamV0bWlyOTkiLCJhIjoiY2xsdzdoMXg3MjZkeDNxcGUzZTJmNTV6aiJ9.HBu2-RjAt9hkDOA2qn9kLg";

  const [viewState, setViewState] = useState({
    // longitude: 20.844354,
    // latitude: 42.543911,
    // zoom: 8.1,

    longitude: -98.5795,
    latitude: 39.8283,
    zoom: 4,
  });

  const onClickHandler = (e: mapboxgl.MapLayerMouseEvent) => {
    // const clickedCoordinates = new LngLat(e.lngLat.lng, e.lngLat.lat);
    const clickedCoordinates = { lng: e.lngLat.lng, lat: e.lngLat.lat };

    onClick(clickedCoordinates);
  };

  const nodesFeatures = nodes.map(({ position, color }, index) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [position.lng, position.lat],
    },
    properties: {
      id: index,
      color,
    },
  }));

  const nodesCollection: FeatureCollection = {
    type: "FeatureCollection",
    //@ts-ignore
    features: nodesFeatures,
  };

  const nodesStyle: CircleLayer = {
    id: "point",
    type: "circle",
    // 'source-layer': 'landuse',
    paint: {
      "circle-radius": 10,
      "circle-color": ["get", "color"],
    },
    source: "node",
  };

  return (
    <MapBox
      id="map"
      mapboxAccessToken={token}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/jetmir99/cllwgfxz200ho01qxdexgbunn"
      onMove={(evt) => setViewState(evt.viewState)}
      onClick={onClickHandler}
      {...viewState}
    >
      <Source id="nodes" type="geojson" data={nodesCollection}>
        <Layer {...nodesStyle} />
      </Source>

      {children}
    </MapBox>
  );
};

export default Map;
