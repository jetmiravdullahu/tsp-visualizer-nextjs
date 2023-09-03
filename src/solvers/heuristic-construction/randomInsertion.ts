import { LngLat } from 'mapbox-gl';
import { computeCost, randomIntFromInterval } from '../helpers';

const randomInsertion = (capitals: LngLat[]) => {
    const points = [...capitals];
  
    const firstItem = points[0];
    points.splice(0, 1);
  
    const path = [firstItem];
  
    path.push(path[0]);
    const pathsAnimation = [[...path]];
  
    while (points.length > 0) {
      const closestPointIndex = randomIntFromInterval(0, points.length - 1);
  
      const [nextPoint] = points.splice(closestPointIndex, 1);
  
      const bestPointIndex = computeCost(path, nextPoint);
      path.splice(bestPointIndex, 0, nextPoint);
      pathsAnimation.push([...path]);
    }
  
    return pathsAnimation;
  };

export default randomInsertion;
