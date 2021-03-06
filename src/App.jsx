import "./App.css";
import React, { useRef } from "react";
import View from "./components/View";
import FPSStats from "react-fps-stats";

const ViewTest = React.forwardRef((props, ref) => (
  <View ref={ref} {...props} />
));

const App = () => {
  const views = [
    { id: "canvas1", width: 800, height: 200 },
    { id: "canvas2", width: 800, height: 200 },
  ];

  const viewsRefs = useRef([]);
  const setRefs = (ref) => {
    debugger;
    viewsRefs.current.push(ref);
  };
  const onStartAcquisition = (id) => {
    debugger;
    viewsRefs.forEach((view) => view.startAcquisition());
  };
  const onStopAcquisition = (id) => viewsRefs[id].stopAcquisition();

  const createElements = () => {
    let elements = [];
    views.forEach((view) => {
      elements.push(
        <ViewTest
          key={view.id}
          id={view.id}
          width={view.width}
          height={view.height}
          ref={setRefs}
        />
      );
    });

    return elements;
  };

  return (
    <div>
      <header>
        <div id="action-buttons">
          <button type="button" onClick={onStartAcquisition}>
            Start
          </button>
          <button type="button" onClick={onStopAcquisition}>
            Stop
          </button>
        </div>
        <FPSStats />
      </header>
      {createElements()}
    </div>
  );
};

export default App;
