import { getRandomNumber } from "./numbers";

const gls = [];

export const createProgram = (gl, vertexShader, fragmentShader) => {
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

export const createShader = (gl, type, source) => {
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

export const initializeCanvas = (id) => {
  const canvas = document.getElementById(id);
  // makeCanvasFullscreen(canvas);

  const currentContext =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  gls.push(currentContext);
};

export const execute = () => {
  gls.forEach((gl) => {
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
    const positionAttributeLocation = gl.getAttribLocation(
      program,
      "a_position"
    );
    const resolutionUniformLocation = gl.getUniformLocation(
      program,
      "u_resolution"
    );
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    let positions = [
    ];

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

    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.LINE_STRIP, 0, positions.length / 2);
  });
};

const makeCanvasFullscreen = (canvas) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
};
