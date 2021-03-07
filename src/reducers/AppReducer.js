const initialState = {
  isAcquisitionStarted: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_ACQUISITION":
      return { ...state, isAcquisitionStarted: true };
    case "STOP_ACQUISITION":
      return { ...state, isAcquisitionStarted: false };
    default:
      return state;
  }
};

export default AppReducer;
