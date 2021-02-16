import "./App.css";
import React from "react";
import { initializeCanvas, execute } from "./services/webgl";
import FPSStats from "react-fps-stats";

var timer;
const canvas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
class App extends React.Component {
  initializeViews = () => initializeCanvas(canvas);
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
        {canvas.map((id) => (
          <canvas key={id} id={id} width="300" height="400" />
        ))}
      </div>
    );
  }
}

export default App;
