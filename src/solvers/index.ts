import { branchAndBoundOnCost } from "./exhaustive/branchAndBoundOnCost";
import { branchAndBoundOnCostAndCross } from "./exhaustive/branchAndBoundOnCostAndCross";
import { depthFirstSearch } from "./exhaustive/depthFirstSearch";
import { random } from "./exhaustive/random";
import { arbitraryInsertion } from "./heuristic-construction/arbitraryInsertion";
import { convexHull } from "./heuristic-construction/convexHull";
import { furthestInsertion } from "./heuristic-construction/furthestInsertion";
import { nearestInsertion } from "./heuristic-construction/nearestInsertion";
import { nearestNeighbor } from "./heuristic-construction/nearestNeighbor";
import { simulatedAnnealing } from "./heuristic-construction/simulatedAnnealing";
import { twoOptInversion } from "./heuristic-improvement/twoOptInversion";
import { twoOptReciprocalExchange } from "./heuristic-improvement/twoOptReciprocalExchange";

export const SOLVERS = {
  BRANCH_AND_BOUND_ON_COST: {
    name: "Branch and Bound on Cost",
    description:
      "A branch and bound algorithm that uses the cost of the current path to determine which paths to explore first.",
    fn: branchAndBoundOnCost,
    category: "Exhaustive",
  },
  BRANCH_AND_BOUND_ON_COST_AND_CROSS: {
    name: "Branch and Bound on Cost and Cross",
    description:
      "A branch and bound algorithm that uses the cost of the current path and the number of crossings to determine which paths to explore first.",
    fn: branchAndBoundOnCostAndCross,
    category: "Exhaustive",
  },
  DEPTH_FIRST_SEARCH: {
    name: "Depth First Search",
    description:
      "A depth first search algorithm that explores all possible paths.",
    fn: depthFirstSearch,
    category: "Exhaustive",
  },
  RANDOM: {
    name: "Random",
    description:
      "A random algorithm that starts at a random vertex and repeatedly visits a random vertex that has not yet been visited.",
    fn: random,
    category: "Exhaustive",
  },

  ARBITRARY_INSERTION: {
    name: "Arbitrary Insertion",
    description:
      "A greedy algorithm that starts with a triangle and repeatedly adds the vertex that minimizes the cost of the new edge.",
    fn: arbitraryInsertion,
    category: "Heuristic Construction",
  },
  CONVEX_HULL: {
    name: "Convex Hull",
    description:
      "A greedy algorithm that starts with the convex hull of the points and repeatedly adds the vertex that minimizes the cost of the new edge.",
    fn: convexHull,
    category: "Heuristic Construction",
  },
  FURTHEST_INSERTION: {
    name: "Furthest Insertion",
    description:
      "A greedy algorithm that starts with a triangle and repeatedly adds the vertex that maximizes the cost of the new edge.",
    fn: furthestInsertion,
    category: "Heuristic Construction",
  },
  NEAREST_INSERTION: {
    name: "Nearest Insertion",
    description:
      "A greedy algorithm that starts with a triangle and repeatedly adds the vertex that minimizes the cost of the new edge.",
    fn: nearestInsertion,
    category: "Heuristic Construction",
  },
  NEAREST_NEIGHBOR: {
    name: "Nearest Neighbor",
    description:
      "A greedy algorithm that starts at a random vertex and repeatedly visits the closest vertex that has not yet been visited.",
    fn: nearestNeighbor,
    category: "Heuristic Construction",
  },
  SIMULATED_ANNEALING: {
    name: "Simulated Annealing",
    description:
      "A heuristic algorithm that starts with a random path and repeatedly swaps two edges if it improves the cost of the path.",
    fn: simulatedAnnealing,
    category: "Heuristic Construction",
  },
  TWO_OPT_INVERSION: {
    name: "2-opt Inversion",
    description:
      "A heuristic algorithm that starts with a random path and repeatedly swaps two edges if it improves the cost of the path.",
    fn: twoOptInversion,
    category: "Heuristic Improvement",
  },
  TWO_OPT_RECIPROCAL_EXCHANGE: {
    name: "2-opt Reciprocal Exchange",
    description:
      "A heuristic algorithm that starts with a random path and repeatedly swaps two edges if it improves the cost of the path.",
    fn: twoOptReciprocalExchange,
    category: "Heuristic Improvement",
  },
};
