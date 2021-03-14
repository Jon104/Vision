import { fliker } from "./numbers";
import { ASCAN } from "./type";

const gls = [];

const floorFlikering = () => [
  -0.99,
  0,
  -0.98,
  fliker(),
  -0.97,
  0,
  -0.851,
  0,
  -0.85,
  fliker(),
  -0.849,
  0,
  -0.76,
  0,
  -0.75,
  fliker(),
  -0.749,
  0,
  -0.747,0,
  -0.746,fliker(),
  -0.745,0,
  0.5,
  0,
  0.73,
  0,
  0.75,
  fliker(),
  0.749,
  0,
  0.741,
  0,
  0.74,
  fliker(),
  0.749,
  0,
  0.9,
  0,
  1.0,
  0,
];

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

export const initializeCanvas = (id, type) => {
  const canvas = document.getElementById(id);
  // makeCanvasFullscreen(canvas);

  const currentContext =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  gls.push({type: type, context: currentContext});
};

export const execute = () => {
  gls.forEach(({type, context}) => {
    if (type === ASCAN) {
      const vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
      const fragmentShaderSource = document.querySelector("#fragment-shader-2d")
        .text;

      const vertexShader = createShader(context, context.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = createShader(
        context,
        context.FRAGMENT_SHADER,
        fragmentShaderSource
      );
      const program = createProgram(context, vertexShader, fragmentShader);
      const positionAttributeLocation = context.getAttribLocation(
        program,
        "a_position"
      );
      const resolutionUniformLocation = context.getUniformLocation(
        program,
        "u_resolution"
      );
      const positionBuffer = context.createBuffer();
      context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);

      let basic = floorFlikering();
      let random = Math.floor(Math.random() * 10);
      if (random < 9 && random > 7) basic =  basic.concat(middleShockwave())
      let positions = basic

      context.bufferData(context.ARRAY_BUFFER, new Float32Array(positions), context.STATIC_DRAW);

      context.viewport(0, 0, context.canvas.width, context.canvas.height);

      context.useProgram(program);

      context.enableVertexAttribArray(positionAttributeLocation);

      context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);

      var size = 2; // 2 components per iteration
      var type = context.FLOAT; // the data is 32bit floats
      var normalize = false; // don't normalize the data
      var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
      var offset = 0; // start at the beginning of the buffer
      context.vertexAttribPointer(
        positionAttributeLocation,
        size,
        type,
        normalize,
        stride,
        offset
      );

      context.uniform2f(resolutionUniformLocation, context.canvas.width, context.canvas.height);

      context.clearColor(0, 0, 0, 1.0);
      context.clear(context.COLOR_BUFFER_BIT);

      context.drawArrays(context.LINE_STRIP, 0, positions.length / 2);
    } else {
      const vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
      const fragmentShaderSource = document.querySelector("#fragment-shader-2d")
        .text;

      const vertexShader = createShader(context, context.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = createShader(
        context,
        context.FRAGMENT_SHADER,
        fragmentShaderSource
      );
      const program = createProgram(context, vertexShader, fragmentShader);
      const positionAttributeLocation = context.getAttribLocation(
        program,
        "a_position"
      );
      const resolutionUniformLocation = context.getUniformLocation(
        program,
        "u_resolution"
      );
      const positionBuffer = context.createBuffer();
      context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);

      let positions = [-0.06,0,-0.06,0.2,0.06,0,0.06,0.2,-0.06, 0.2, 0.06,0]
      
      context.bufferData(context.ARRAY_BUFFER, new Float32Array(positions), context.STATIC_DRAW);

      context.viewport(0, 0, context.canvas.width, context.canvas.height);

      context.useProgram(program);

      context.enableVertexAttribArray(positionAttributeLocation);

      context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);

      var size = 2; // 2 components per iteration
      var type = context.FLOAT; // the data is 32bit floats
      var normalize = false; // don't normalize the data
      var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
      var offset = 0; // start at the beginning of the buffer
      context.vertexAttribPointer(
        positionAttributeLocation,
        size,
        type,
        normalize,
        stride,
        offset
      );

      context.uniform2f(resolutionUniformLocation, context.canvas.width, context.canvas.height);

      context.clearColor(0, 0, 0, 1.0);
      context.clear(context.COLOR_BUFFER_BIT);

      context.drawArrays(context.TRIANGLES, 0, positions.length / 2);
    }
  });
};

const middleShockwave = () => [ 
  -0.06,0,
  -0.05,0.1,
  -0.04,-0.1,
  -0.03,0,
  -0.02,0.25,
  -0.01,-0.25,
  0.0,0.5,
  0.01,-0.5,
  0.02,0.25,
  0.03,-0.25,
  0.04,0.1,
  0.05,-0.1,
  0.06,0
]

const makeCanvasFullscreen = (canvas) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
};
