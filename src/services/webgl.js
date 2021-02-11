export const initializeGL = () => {
  const canvas1 = document.querySelector("#canvas1");
  const canvas2 = document.querySelector("#canvas2");
  const canvas3 = document.querySelector("#canvas3");
  const canvas4 = document.querySelector("#canvas4");

  const gl1 =
    canvas1.getContext("webgl") || canvas1.getContext("experimental-webgl");
  const gl2 =
    canvas2.getContext("webgl") || canvas2.getContext("experimental-webgl");
  const gl3 =
    canvas3.getContext("webgl") || canvas3.getContext("experimental-webgl");
  const gl4 =
    canvas4.getContext("webgl") || canvas4.getContext("experimental-webgl");

  if (gl1 && gl2 && gl3 && gl4) {
    execute(gl1);
    execute(gl2);
    execute(gl3);
    execute(gl4);
  }
};

const execute = (gl) => {
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
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // three 2d points
  var positions = [0, 0, 0, 0.5, 0.7, 0];
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

  var primitiveType = gl.POINTS;
  var count = 1;
  const color = getRandomColor();
  gl.clearColor(color[0], color[1], color[2], 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(primitiveType, 0, count);
};

const getRandomColor = () => {
  return [Math.random(), Math.random(), Math.random()];
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
