import { LngLat } from "mapbox-gl";
import { pathCost } from "../helpers";

const setDifference = (setA: any, setB: any) => {
    const ret = new Set(setA);
    setB.forEach((p: any) => {
      ret.delete(p);
    });
    return ret;
  };
  
  const dfs = (nodes: any, path: any = [], visited: any = null, overallBest = null) => {

    let points: any = [...nodes]

    if (visited === null) {
      // initial call
      path = [points.shift()];
      points = new Set(points);
      visited = new Set();
    }
  
    // figure out what points are left from this point
    const available = setDifference(points, visited);
  
    if (available.size === 0) {
      // this must be a complete path
      const backToStart = [...path, path[0]];
  
      // calculate the cost of this path
      const cost = pathCost(backToStart);
  
      // return both the cost and the path where we're at
      return [cost, backToStart];
    }
  
    let [bestCost, bestPath] = [null, null];
  
    // for every point yet to be visited along this path
    for (const p of available) {
      // go to that point
      visited.add(p);
      path.push(p);
  
      // RECURSE - go through all the possible points from that point
      const [curCost, curPath]: any = dfs(points, path, visited, overallBest);
  
      // if that path is better, keep it
      if (bestCost === null || curCost < bestCost) {
        [bestCost, bestPath] = [curCost, curPath];
  
        if (overallBest === null || bestCost! < overallBest) {
          // found a new best complete path
          overallBest = bestCost;
        }
      }
  
      // go back up and make that point available again
      visited.delete(p);
      path.pop();
  
    }
    return [bestCost, bestPath];
  };
  
export default dfs;
