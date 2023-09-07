import { IPoint } from "@/store/main/types";

export function getDistance(city1: IPoint, city2: IPoint) {
  const R = 6371; // radius of Earth in km
  const dLat = toRadians(city2.lat - city1.lat);
  const dLon = toRadians(city2.lng - city1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(city1.lat)) *
      Math.cos(toRadians(city2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distance in km
}

export function calculateRouteCost(route: IPoint[]) {
  let total = 0;

  for (let i = 0; i < route.length - 1; i++) {
    const from = route[i];
    const to = route[i + 1];
    total += getDistance(from, to);
  }

  return total;
}

export function toRadians(deg: number) {
  return deg * (Math.PI / 180);
}

