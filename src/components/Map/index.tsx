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

interface Props {
  nodes: LngLatType[];
  accumulator: LngLatType[];
  onClick: (node: LngLatType) => void;
}

const Map: React.FC<Props> = ({ nodes, onClick, accumulator }) => {
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
  const [edges, setEdges] = useState<LngLatType[]>([]);

  useEffect(() => {
    if (accumulator && accumulator.length > 1) {
      setEdges(accumulator);
    }
  }, [accumulator]);

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
      color: index === 0 ? "blue" : "red",
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
      "circle-radius": 4,
      "circle-color": ["get", "color"],
    },
    source: "node",
  };

  const edgesCollection: FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: edges.slice(0, -1).map((edge) => [edge.lng, edge.lat]),
        },
        properties: {
          color: "red",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            edges && [
              edges[edges.length - 1]?.lng,
              edges[edges.length - 1]?.lat,
            ],
            edges && [
              edges[edges.length - 2]?.lng,
              edges[edges.length - 2]?.lat,
            ],
          ],
        },
        properties: {
          color: "blue",
        },
      },
    ],
  };
  const lastEdgeCollection: FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            edges && [
              edges[edges.length - 1]?.lng,
              edges[edges.length - 1]?.lat,
            ],
            edges && [
              edges[edges.length - 2]?.lng,
              edges[edges.length - 2]?.lat,
            ],
          ],
        },
        properties: {},
      },
    ],
  };

  const edgesStyle: LineLayer = {
    id: "line",
    type: "line",
    paint: {
      "line-width": 4,
      "line-color": ["get", "color"],
    },
    source: "edge",
  };

  const lastEdgeStyle: LineLayer = {
    id: "lastEdge",
    type: "line",
    paint: {
      "line-width": 4,
      "line-color": "blue",
    },
    source: "lastEdge",
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

      <Source id="edges" type="geojson" data={edgesCollection}>
        <Layer {...edgesStyle} />
      </Source>
    </MapBox>
  );
};

export default Map;
