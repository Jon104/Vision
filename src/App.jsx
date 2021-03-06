import "./App.css";
import React from "react";
import { initializeCanvas, execute } from "./services/webgl";
import View from "./components/View";
import FPSStats from "react-fps-stats";

var timer;
const App = () => {
  const onInitializeViews = () => initializeCanvas();
  const onStartAcquisition = () => (timer = setInterval(execute, 20));
  const onStopAcquisition = () => clearInterval(timer);

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
          <button type="button" onClick={onInitializeViews}>
            Initialize
          </button>
        </div>
        <FPSStats />
      </header>
      <View />
    </div>
  );
};

export default App;
