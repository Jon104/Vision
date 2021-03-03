import { getRandomNumber } from "./numbers";

let gl;
const amountOfPoints = 5000;

export const initializeCanvas = () => {
  const canvas = document.getElementById("views");
  // makeCanvasFullscreen(canvas);

  gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  if (gl) execute();
};

export const execute = () => {
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

  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const resolutionUniformLocation = gl.getUniformLocation(
    program,
    "u_resolution"
  );
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  let positions = [
    -0.99,
    0,
    -0.98,
    getRandomNumber(),
    -0.97,
    getRandomNumber(),
    -0.96,
    getRandomNumber(),
    -0.95,
    getRandomNumber(),
    -0.94,
    getRandomNumber(),
    -0.93,
    getRandomNumber(),
    -0.92,
    getRandomNumber(),
    -0.91,
    getRandomNumber(),
    -0.89,
    getRandomNumber(),
    -0.88,
    getRandomNumber(),
    -0.87,
    getRandomNumber(),
    -0.86,
    getRandomNumber(),
    -0.85,
    getRandomNumber(),
    -0.84,
    getRandomNumber(),
    -0.83,
    getRandomNumber(),
    -0.82,
    getRandomNumber(),
    -0.81,
    getRandomNumber(),
    -0.79,
    getRandomNumber(),
    -0.78,
    getRandomNumber(),
    -0.77,
    getRandomNumber(),
    -0.76,
    getRandomNumber(),
    -0.75,
    getRandomNumber(),
    -0.74,
    getRandomNumber(),
    -0.73,
    getRandomNumber(),
    -0.72,
    getRandomNumber(),
    -0.71,
    getRandomNumber(),
    -0.69,
    getRandomNumber(),
    -0.68,
    getRandomNumber(),
    -0.67,
    getRandomNumber(),
    -0.66,
    getRandomNumber(),
    -0.65,
    getRandomNumber(),
    -0.64,
    getRandomNumber(),
    -0.63,
    getRandomNumber(),
    -0.62,
    getRandomNumber(),
    -0.61,
    getRandomNumber(),
    -0.6,
    0,
    -0.59,
    getRandomNumber(),
    -0.58,
    getRandomNumber(),
    -0.57,
    getRandomNumber(),
    -0.56,
    getRandomNumber(),
    -0.55,
    getRandomNumber(),
    -0.54,
    getRandomNumber(),
    -0.53,
    getRandomNumber(),
    -0.52,
    getRandomNumber(),
    -0.51,
    getRandomNumber(),
    -0.49,
    getRandomNumber(),
    -0.48,
    getRandomNumber(),
    -0.47,
    getRandomNumber(),
    -0.46,
    getRandomNumber(),
    -0.45,
    getRandomNumber(),
    -0.44,
    getRandomNumber(),
    -0.43,
    getRandomNumber(),
    -0.42,
    getRandomNumber(),
    -0.41,
    getRandomNumber(),
    -0.4,
    0,
    -0.39,
    0,
    -0.38,
    getRandomNumber(),
    -0.37,
    getRandomNumber(),
    -0.36,
    getRandomNumber(),
    -0.35,
    getRandomNumber(),
    -0.34,
    getRandomNumber(),
    -0.33,
    getRandomNumber(),
    -0.32,
    getRandomNumber(),
    -0.31,
    getRandomNumber(),
    -0.29,
    0,
    -0.28,
    getRandomNumber(),
    -0.27,
    getRandomNumber(),
    -0.26,
    getRandomNumber(),
    -0.25,
    getRandomNumber(),
    -0.24,
    getRandomNumber(),
    -0.23,
    getRandomNumber(),
    -0.22,
    getRandomNumber(),
    -0.21,
    getRandomNumber(),
    -0.19,
    getRandomNumber(),
    -0.18,
    getRandomNumber(),
    -0.17,
    getRandomNumber(),
    -0.16,
    getRandomNumber(),
    -0.15,
    getRandomNumber(),
    -0.14,
    getRandomNumber(),
    -0.13,
    getRandomNumber(),
    -0.12,
    getRandomNumber(),
    -0.11,
    getRandomNumber(),
    0,
    0,
    0.11,
    getRandomNumber(),
    0.12,
    getRandomNumber(),
    0.13,
    getRandomNumber(),
    0.14,
    getRandomNumber(),
    0.15,
    getRandomNumber(),
    0.16,
    getRandomNumber(),
    0.17,
    getRandomNumber(),
    0.18,
    getRandomNumber(),
    0.19,
    getRandomNumber(),
    0.21,
    getRandomNumber(),
    0.22,
    getRandomNumber(),
    0.23,
    getRandomNumber(),
    0.24,
    getRandomNumber(),
    0.25,
    getRandomNumber(),
    0.26,
    getRandomNumber(),
    0.27,
    getRandomNumber(),
    0.28,
    getRandomNumber(),
    0.29,
    getRandomNumber(),
    0.31,
    getRandomNumber(),
    0.32,
    getRandomNumber(),
    0.33,
    getRandomNumber(),
    0.34,
    getRandomNumber(),
    0.35,
    getRandomNumber(),
    0.36,
    getRandomNumber(),
    0.37,
    getRandomNumber(),
    0.38,
    getRandomNumber(),
    0.39,
    getRandomNumber(),
    0.41,
    getRandomNumber(),
    0.42,
    getRandomNumber(),
    0.43,
    getRandomNumber(),
    0.44,
    getRandomNumber(),
    0.45,
    getRandomNumber(),
    0.46,
    getRandomNumber(),
    0.47,
    getRandomNumber(),
    0.48,
    getRandomNumber(),
    0.49,
    getRandomNumber(),
    0.51,
    getRandomNumber(),
    0.52,
    getRandomNumber(),
    0.53,
    getRandomNumber(),
    0.54,
    getRandomNumber(),
    0.55,
    getRandomNumber(),
    0.56,
    getRandomNumber(),
    0.57,
    getRandomNumber(),
    0.58,
    getRandomNumber(),
    0.59,
    getRandomNumber(),
    0.61,
    getRandomNumber(),
    0.62,
    getRandomNumber(),
    0.63,
    getRandomNumber(),
    0.64,
    getRandomNumber(),
    0.65,
    getRandomNumber(),
    0.66,
    getRandomNumber(),
    0.67,
    getRandomNumber(),
    0.68,
    getRandomNumber(),
    0.69,
    getRandomNumber(),
    0.71,
    getRandomNumber(),
    0.72,
    getRandomNumber(),
    0.73,
    getRandomNumber(),
    0.74,
    getRandomNumber(),
    0.75,
    getRandomNumber(),
    0.76,
    getRandomNumber(),
    0.77,
    getRandomNumber(),
    0.78,
    getRandomNumber(),
    0.79,
    getRandomNumber(),
    0.81,
    getRandomNumber(),
    0.82,
    getRandomNumber(),
    0.83,
    getRandomNumber(),
    0.84,
    getRandomNumber(),
    0.85,
    getRandomNumber(),
    0.86,
    getRandomNumber(),
    0.87,
    getRandomNumber(),
    0.88,
    getRandomNumber(),
    0.89,
    getRandomNumber(),
    1,
    getRandomNumber(),
  ]; // getRandomPositions(amountOfPoints);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.useProgram(program);

  gl.enableVertexAttribArray(positionAttributeLocation);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var size = 2; // 2 components per iteration
  var type = gl.FLOAT; // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );

  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  var count = amountOfPoints;
  gl.clearColor(0, 0, 0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.LINE_STRIP, 0, count);
};

const createProgram = (gl, vertexShader, fragmentShader) => {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
};

const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
};

const makeCanvasFullscreen = (canvas) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
};
