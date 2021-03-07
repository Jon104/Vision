const initialState = {
  isAcquisitionStarted: false,
  views: [],
  timers: [],
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TIMER":
      return { ...state, timers: [...state.timers, action.timer] };
    case "ADD_VIEW":
      return { ...state, views: [...state.views, action.view] };
    case "START_ACQUISITION":
      return { ...state, isAcquisitionStarted: true };
    case "STOP_ACQUISITION":
      return { ...state, isAcquisitionStarted: false };
    default:
      return state;
  }
};

export default AppReducer;
