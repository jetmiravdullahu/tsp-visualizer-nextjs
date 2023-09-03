import { LngLat } from "mapbox-gl";

export const totalPathCost = (path: LngLat[]) => {
  let distanceInMeters = 0;

  path.forEach((point, pointIndex) => {
    if (pointIndex > 0) {
      distanceInMeters += path[pointIndex - 1].distanceTo(path[pointIndex]);
    }
  });

  return Math.round(distanceInMeters / 1000);
};

export const getInsertionCost = (
  previous: LngLat,
  toInsert: LngLat,
  next: LngLat
) => {
  const costBeforeInsertion = previous.distanceTo(next);

  const costAfterInsertion =
    previous.distanceTo(toInsert) + toInsert.distanceTo(next);
  return costAfterInsertion - costBeforeInsertion;
};

export const computeCost = (path: LngLat[], nextPoint: LngLat) => {
  let [bestCost, bestPointIndex]: any[] = [Infinity, null];

  for (let i = 1; i < path.length; i += 1) {
    const insertionCost = getInsertionCost(path[i - 1], nextPoint, path[i]);
    if (insertionCost < bestCost) {
      [bestCost, bestPointIndex] = [insertionCost, i];
    }
  }

  return bestPointIndex;
};

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* ============================================ */

export const pathCost = (path: LngLat[]) => {
  return path
    .slice(0, -1)
    .map((point, idx) => point.distanceTo(path[idx + 1]))
    .reduce((a, b) => a + b, 0);
};


export const setDifference = (setA: any, setB: any) => {
  const ret = new Set(setA);
  setB.forEach((p: any) => {
    ret.delete(p);
  });
  return ret;
};


export const counterClockWise = (p: LngLat, q: LngLat, r: LngLat) => {
  return (q.lng - p.lng) * (r.lat - q.lat) < (q.lat - p.lat) * (r.lng - q.lng);
};

export const rotateToStartingPoint = (path: LngLat[], startingPoint: LngLat) => {
  const startIdx = path.findIndex(p => p === startingPoint);
  path.unshift(...path.splice(startIdx, path.length));
};