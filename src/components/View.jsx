import React, { useEffect } from "react";
import { connect } from "react-redux";
import { initializeCanvas } from "../services/webgl";

const View = (props) => {
  const { id, width, height } = props;
  useEffect(() => initializeCanvas(id));

  const amplitudeRulerBreakpoints = [
    -100,
    -80,
    -60,
    -40,
    -20,
    0,
    20,
    40,
    60,
    80,
    100,
  ];

  const ultrasoundRulerBreakpoints = [
    0,
    50,
    100,
    150,
    200,
    250,
    300,
    350,
    400,
    450,
    500,
  ];

  const setTransformHeight = (index) => {
    const position = height - index * 20;
    return `translate(0, ${position})`;
  };
  const setTransformWidth = (value) => {
    const position = width - value * 80;
    return `translate(${position}, 10)`;
  };

  return (
    <>
      <div className="columns no-gutters">
        <div className="column no-gutters h200 mw800">
          <canvas
            id={id}
            width={width.toString().concat("px")}
            height={height}
          />
        </div>
        <svg className="column no-gutters">
          <line stroke="yellow" x1="0" y1={height} x2="0" y2="0" />
          {amplitudeRulerBreakpoints.map((value, index) => (
            <g key={index} transform={setTransformHeight(index)}>
              <path stroke="yellow" d="M0,0L6,0"></path>
              <text
                className="is-size-7"
                transform="translate(9, 0)"
                fill="yellow"
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
        <line stroke="purple" x1="0" y1="0" x2={width} y2="0" />
        {ultrasoundRulerBreakpoints.map((value, index) => (
          <g key={index} transform={setTransformWidth(index)}>
            <text
              className="is-size-7"
              transform="translate(9, 0)"
              fill="purple"
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

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(View);
