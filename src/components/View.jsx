import React from "react";

const View = () => {
  const rulersBreakpoints = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const width = 800;
  const height = 200;
  const setTransformHeight = (value) => {
    const position = height - value * 2;
    return `translate(0, ${position})`;
  };
  const setTransformWidth = (value) => {
    const position = width - value * 8;
    return `translate(${position}, 10)`;
  };

  return (
    <>
      <div className="columns no-gutters">
        <div className="column no-gutters h200">
          <canvas
            id="views"
            width={width.toString().concat("px")}
            height={height}
          />
        </div>
        <svg className="column no-gutters">
          <line stroke="blue" x1="0" y1={height} x2="0" y2="0" />
          {rulersBreakpoints.map((value, index) => (
            <g key={index} transform={setTransformHeight(value)}>
              <path stroke="blue" d="M0,0L6,0"></path>
              <text
                className="is-size-7"
                transform="translate(9, 0)"
                fill="blue"
                visibility="false"
                dy="0.32em"
              >
                {value}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <svg className="column no-gutters" width={width} height="100px">
        <line stroke="blue" x1="0" y1="0" x2={width} y2="0" />
        {rulersBreakpoints.map((value, index) => (
          <g key={index} transform={setTransformWidth(value)}>
            <text
              className="is-size-7"
              transform="translate(9, 0)"
              fill="blue"
              visibility="false"
              dy="0.32em"
            >
              {value}
            </text>
          </g>
        ))}
      </svg>
    </>
  );
};

export default View;
