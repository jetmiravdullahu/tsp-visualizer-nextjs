import { TSP } from "@/solvers";

export const isValidAlgorithm = (value: string): value is keyof typeof TSP => {
  if (value in TSP) return true;
  return false;
};
