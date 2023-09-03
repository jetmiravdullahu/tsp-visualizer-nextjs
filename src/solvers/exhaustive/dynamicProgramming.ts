import { LngLat } from "mapbox-gl";

const dynamicProgramming = (nodes: LngLat[]): LngLat[][] => {
  console.log("called");
  const points = [...nodes];
  const numPoints = points.length;
  const pathsAnimation: LngLat[][] = [];

  const distanceMatrix: number[][] = new Array(numPoints)
    .fill(null)
    .map(() => new Array(numPoints).fill(0));
  console.log("distanceMatrix");

  for (let i = 0; i < numPoints; i++) {
    console.log("inside First Loop");
    for (let j = 0; j < numPoints; j++) {
      console.log("inside second Loop");

      distanceMatrix[i][j] = points[i].distanceTo(points[j]);
    }
  }

  // Initialize memoization table for dynamic programming.
  const memo: number[][] = [];
  for (let i = 0; i < numPoints; i++) {
    console.log("inside third loop");
    memo[i] = [];
  }
  console.log(memo);

  // Start DP with a mask representing all points and starting from point 0.
  const START_NODE = 0;
  const VISITED_ALL = (1 << numPoints) - 1;

  // Recursive function to compute the shortest path.
  function dp(currentNode: number, visitedMask: number): number {
    console.log("inside Function");
    if (visitedMask === VISITED_ALL) {
      // Return the distance from the current node back to the starting node.
      return distanceMatrix[currentNode][START_NODE];
    }

    // Check if the result is memoized.
    if (typeof memo[currentNode][visitedMask] !== "undefined") {
      return memo[currentNode][visitedMask];
    }

    let shortestDistance = Infinity;

    for (let nextNode = 0; nextNode < numPoints; nextNode++) {
      if ((visitedMask & (1 << nextNode)) === 0) {
        const newDistance =
          distanceMatrix[currentNode][nextNode] +
          dp(nextNode, visitedMask | (1 << nextNode));
        shortestDistance = Math.min(shortestDistance, newDistance);
      }
    }

    // Memoize the result.
    memo[currentNode][visitedMask] = shortestDistance;
    console.log("function completed");

    return shortestDistance;
  }

  // Find the minimum cost starting from node 0.
  const minCost = dp(START_NODE, 1 << START_NODE);

  // Reconstruct the path.
  const path: LngLat[] = [];
  pathsAnimation.push([...path]);
  console.log(pathsAnimation);
  let currentNode = START_NODE;
  let visitedMask = 1 << START_NODE;

  for (let i = 1; i < numPoints; i++) {
    console.log("inside fourth loop");
    let nextNode = -1;
    for (let j = 0; j < numPoints; j++) {
      console.log("inside fifth loop");
      if ((visitedMask & (1 << j)) === 0) {
        console.log("inside first if");
        if (nextNode === -1) {
          console.log("inside second if");
          nextNode = j;
        }
        const currentToNext =
          distanceMatrix[currentNode][nextNode] +
          memo[nextNode][visitedMask | (1 << j)];
        const currentToNextOptimal =
          distanceMatrix[currentNode][nextNode] + memo[nextNode][visitedMask];
        if (currentToNext === currentToNextOptimal) {
          console.log("inside third if");
          nextNode = j;
        }
      }
    }
    path.push(points[nextNode]);
    pathsAnimation.push([...path]);
    console.log(pathsAnimation);
    visitedMask |= 1 << nextNode;
    currentNode = nextNode;
  }

  console.log("done");

  return pathsAnimation;
};

export default dynamicProgramming;
