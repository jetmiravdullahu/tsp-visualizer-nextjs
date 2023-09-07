import { IPoint } from "@/store/main/types";
import type { FeatureCollection } from "geojson";
import { Layer, LineLayer, Source } from "react-map-gl";

type Props = {
  accumulator: { path: IPoint[]; color: string | number[]; width: number }[];
};

export const Edges: React.FC<Props> = ({ accumulator }) => {
  const edgeCollections: FeatureCollection[] = accumulator.map(
    (edge, index) => {
      return {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: edge.path.map((node) => [node.lng, node.lat]),
            },
            properties: {
              color: edge.color,
              width: 5,
            },
          },
        ],
      };
    }
  );

  const edgesStyle: LineLayer = {
    id: "line",
    type: "line",
    paint: {
      "line-width": ["get", "width"],
      "line-color": ["get", "color"],
    },
    source: "edge",
  };

  return edgeCollections.map((edge, index) => (
    <Source key={index} id={`edge${index}`} type="geojson" data={edge}>
      <Layer {...edgesStyle} />
    </Source>
  ));
};
