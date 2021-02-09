import "./App.css";
import React from "react";
import { initializeGL } from "./services/webgl";
import FPSStats from "react-fps-stats";

var timer;
class App extends React.Component {
  componentDidMount() {
    initializeGL();
  }

  startAcquisition = () => (timer = setInterval(initializeGL, 13));
  stopAcquisition = () => clearInterval(timer);

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <canvas id="canvas" width="400" height="300" />
          <FPSStats />
          <button type="button" onClick={this.startAcquisition}>
            Start
          </button>
          <button type="button" onClick={this.stopAcquisition}>
            Stop
          </button>
        </header>
      </div>
    );
  }
}

export default App;
