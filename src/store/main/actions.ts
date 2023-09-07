export const SET_VIEWPORT_STATE = "SET_VIEWPORT_STATE";

export const RESET_EVALUATING_STATE = "RESET_EVALUATING_STATE";
export const RESET_BEST_PATH_STATE = "RESET_BEST_PATH_STATE";

export const SET_ALGORITHM = "SET_ALGORITHM";
export const SET_DELAY = "SET_DELAY";
export const SET_EVALUATING_DETAIL_LEVEL = "SET_EVALUATING_DETAIL_LEVEL";
export const SET_SHOW_BEST_PATH = "SET_SHOW_BEST_PATH";
export const START_SOLVING = "START_SOLVING";
export const GO_FULL_SPEED = "GO_FULL_SPEED";
export const PAUSE = "PAUSE";
export const UNPAUSE = "UNPAUSE";
export const STOP_SOLVING = "STOP_SOLVING";

export const SET_BEST_PATH = "SET_BEST_PATH";
export const SET_EVALUATING_PATHS = "SET_EVALUATING_PATHS";

export const START_DEFINING_POINTS = "START_DEFINING_POINTS";
export const ADD_DEFINED_POINT = "ADD_DEFINED_POINT";
export const STOP_DEFINING_POINTS = "STOP_DEFINING_POINTS";
export const SET_POINT_COUNT = "SET_POINT_COUNT";
export const SET_POINTS = "SET_POINTS";
export const SET_DEFAULT_MAP = "SET_DEFAULT_MAP";

export const TOGGLE_SITE_INFO_OPEN = "TOGGLE_SITE_INFO_OPEN";
export const TOGGLE_ALG_INFO_OPEN = "TOGGLE_ALG_INFO_OPEN";

export const startSolvingAction = (
  points: any,
  delay: number,
  evaluatingDetailLevel: number
) => ({
  type: START_SOLVING,
  points,
  delay,
  evaluatingDetailLevel,
  fullSpeed: false,
});

export const pause = () => ({
  type: PAUSE,
});

export const unpause = () => ({
  type: UNPAUSE,
});

export const setDelay = (delay: number) => ({
  type: SET_DELAY,
  delay,
});
