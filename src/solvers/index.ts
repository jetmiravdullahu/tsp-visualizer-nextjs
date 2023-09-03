export const TSP = {
  NEAREST_NEIGHBOR: 'NEAREST_NEIGHBOR',
  NEAREST_INSERTION: 'NEAREST_INSERTION',
  RANDOM_INSERTION: 'RANDOM_INSERTION',
  FURTHEST_INSERTION: 'FURTHEST_INSERTION',
  CHEAPEST_INSERTION: 'CHEAPEST_INSERTION',
  CONVEX_HULL: 'CONVEX_HULL',
  TWO_OPT_INVERSION: 'TWO_OPT_INVERSION',
  DYNAMIC_PROGRAMMING: 'DYNAMIC_PROGRAMMING',
  DEPTH_FIRST_SEARCH: 'DEPTH_FIRST_SEARCH',
} as const;


export { default as nearestNeighbor } from './heuristic-construction/nearestNeighbor';
export { default as nearestInsertion } from './heuristic-construction/nearestInsertion';
export { default as randomInsertion } from './heuristic-construction/randomInsertion';
export { default as furthestInsertion } from './heuristic-construction/furthestInsertion';
export { default as cheapestInsertion } from './heuristic-construction/cheapestInsertion';
export { default as convexHull } from './heuristic-construction/convexHull';
export { default as twoOptInversion } from './heuristic-improvement/twoOptInversion';
export { default as dynamicProgramming } from './exhaustive/dynamicProgramming';
export { default as depthFirstSearch } from './exhaustive/depthFirstSearch';







