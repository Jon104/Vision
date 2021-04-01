import React, { useState } from "react"
import Draggable from "react-draggable";
import { getColor } from "../services/utils";
import View from "./View";

const Views = (props) => {
  const [views, setViews] = useState([
    {
      id: "canvas1",
      type: "ascan",
      rulers: { vertical: "amp", horizontal: "ultrasound" },
      width: 800,
      height: 200,
    },
    {
      id: "canvas2",
      type: "ascan",
      subtype: "pos",
      rulers: { vertical: "amp", horizontal: "ultrasound" },
      width: 800,
      height: 200,
    },
    {
      id: "canvas3vie",
      type: "sectorial",
      rulers: { vertical: "ultrasound", horizontal: "amp" },
      width: 800,
      height: 200,
    }
  ])

  return (
    <>
      {views.map((view) => (
        <div key={view.id}>
          <Draggable
            axis="x"
            bounds={{
              left: 0,
              top: 0,
              right: view.width,
              bottom: 0,
            }}
          >
            <svg className="absolute pointer" height={view.height} width="10">
              <line
                x1="0"
                y1={view.height}
                x2="0"
                y2="0"
                stroke={getColor(view.rulers.vertical)}
                className="cursor"
              />
            </svg>
          </Draggable>
          <Draggable
            axis="y"
            bounds={{
              left: 0,
              top: 0,
              right: 0,
              bottom: view.height,
            }}
          >
            <svg className="absolute pointer" height="1" width={view.width}>
              <line
                x1={view.width}
                y1="0"
                x2="0"
                y2="0"
                stroke={getColor(view.rulers.horizontal)}
                className="cursor"
              />
            </svg>
          </Draggable>
          <View id={view.id} width={view.width} height={view.height} type={view.type} subtype={view.subtype}/>
        </div>
      ))}
    </>
  )
}

export default Views;