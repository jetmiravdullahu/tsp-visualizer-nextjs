"use client";
import MapBox from "react-map-gl";
import { useState } from "react";

interface Props {}

const Map: React.FC<Props> = (props: Props) => {
  const [coords, setCoords] = useState<number[][]>([]);
  const token =
    "pk.eyJ1IjoiamV0bWlyOTkiLCJhIjoiY2xsdzdoMXg3MjZkeDNxcGUzZTJmNTV6aiJ9.HBu2-RjAt9hkDOA2qn9kLg";

  const [viewState, setViewState] = useState({
    longitude: 20.844354,
    latitude: 42.543911,
    zoom: 8.1,
  });

  const onClick = (e: mapboxgl.MapLayerMouseEvent) => {
    const point = [e.lngLat.lng, e.lngLat.lat];
    console.log(point);
  };

  return (
    <MapBox
      mapboxAccessToken={token}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/jetmir99/cllwgfxz200ho01qxdexgbunn"
      onMove={(evt) => setViewState(evt.viewState)}
      {...viewState}
      onClick={onClick}
    >
      
    </MapBox>
  );
};

export default Map;
