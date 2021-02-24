import "./App.css";
import React from "react";
import { initializeCanvas, execute } from "./services/webgl";
import FPSStats from "react-fps-stats";

var timer;
class App extends React.Component {
  initializeViews = () => initializeCanvas();
  startAcquisition = () => (timer = setInterval(execute, 20));
  stopAcquisition = () => clearInterval(timer);

  render() {
    return (
      <div>
        <header>
          <div id="action-buttons">
            <button type="button" onClick={this.startAcquisition}>
              Start
            </button>
            <button type="button" onClick={this.stopAcquisition}>
              Stop
            </button>
            <button type="button" onClick={this.initializeViews}>
              Initialize
            </button>
          </div>
          <FPSStats />
        </header>
        <canvas id="views" />
      </div>
    );
  }
}

export default App;
