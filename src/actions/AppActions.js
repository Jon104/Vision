import { createProgram, createShader } from "../services/webgl";

export const createGL = (id) => (dispatch) => {
  try {
    const canvas = document.getElementById(id);
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    const vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
    const fragmentShaderSource = document.querySelector("#fragment-shader-2d")
      .text;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    const program = createProgram(gl, vertexShader, fragmentShader);

    const view = {
      gl,
      program,
    };

    dispatch({ type: "ADD_VIEW", view });
  } catch (error) {
    console.error("Start Acquisition");
  }
};

export const startAcquisition = () => (dispatch, getState) => {
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
