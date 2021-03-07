export const startAcquisition = () => async (dispatch) => {
  try {
    dispatch({ type: "START_ACQUISITION" });
  } catch (error) {
    console.error("Start Acquisition");
  }
};

export const stopAcquisition = () => (dispatch) => {
  try {
    dispatch({ type: "STOP_ACQUISITION" });
  } catch (error) {
    console.error("Stop Acquisition");
  }
};
