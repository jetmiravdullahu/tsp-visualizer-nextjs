"use client";
import { useState } from "react";
import MapBox, {
  CircleLayer,
  Layer,
  LineLayer,
  Source,
  LngLat as LngLatType,
} from "react-map-gl";
import { LngLat } from "mapbox-gl";

import type { FeatureCollection } from "geojson";
import { Button } from "../ui/button";

interface Props {
  nodes: LngLatType[];
  edges: LngLatType[];
  isPlaying: boolean;
  onClick: (node: LngLatType) => void;
}

const Map: React.FC<Props> = ({ nodes, onClick, edges, isPlaying }) => {
  const token =
    "pk.eyJ1IjoiamV0bWlyOTkiLCJhIjoiY2xsdzdoMXg3MjZkeDNxcGUzZTJmNTV6aiJ9.HBu2-RjAt9hkDOA2qn9kLg";

  const [viewState, setViewState] = useState({
    longitude: 20.844354,
    latitude: 42.543911,
    zoom: 8.1,
  });
  const [customPoints, setCustomPoints] = useState(false);
  const [play, setPlay] = useState(false);

  const onClickHandler = (e: mapboxgl.MapLayerMouseEvent) => {
    const clickedCoordinates = new LngLat(e.lngLat.lng, e.lngLat.lat);

    onClick(clickedCoordinates);
  };

  const nodesFeatures = nodes.map((coordinates, index) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [coordinates.lng, coordinates.lat],
    },
    properties: {
      id: index,
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
    paint: {
      "circle-radius": 8,
      "circle-color": "red",
    },
    source: "test",
  };
  const edgesCollection: FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: edges.map((edge) => [edge.lng, edge.lat]),
        },
        properties: {},
      },
    ],
  };

  const edgesStyle: LineLayer = {
    id: "line",
    type: "line",
    paint: {
      "line-width": 8,
      "line-color": "red",
    },
    source: "test",
  };

  console.log(edges);

  return (
    <MapBox
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
      {isPlaying && (
        <Source id="edges" type="geojson" data={edgesCollection}>
          <Layer {...edgesStyle} />
        </Source>
      )}
    </MapBox>
  );
};

export default Map;
