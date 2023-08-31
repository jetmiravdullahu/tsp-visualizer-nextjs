'use client'
import Map from "@/components/Map";
import { addNode } from "@/store/main/mainSlice";
import { getEdges, getIsDefiningPoints, getIsPlaying, getNodes } from "@/store/main/selectors";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { LngLat as LngLatType } from "react-map-gl";

export default function Home() {
  const dispatch = useAppDispatch();

  const nodes = useAppSelector(getNodes);
  const edges = useAppSelector(getEdges);
  const isDefiningPoints = useAppSelector(getIsDefiningPoints)
  const isPlaying = useAppSelector(getIsPlaying)



  const onMapClick = (node: LngLatType) => {
    if(isDefiningPoints) dispatch(addNode(node));
  };

  return (
    <main className="h-full">
      <div className="h-full">
        <Map onClick={onMapClick} nodes={nodes} edges={edges} isPlaying={isPlaying} />
      </div>
    </main>
  );
}
