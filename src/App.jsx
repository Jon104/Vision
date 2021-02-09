import "./App.css";
import React from "react";
import { initializeGL, drawAnimations } from "./services/webgl";
import { startAnimating } from "./services/animate";
import FPSStats from "react-fps-stats";

class App extends React.Component {
  componentDidMount() {
    initializeGL();
    setInterval(initializeGL, 13);
    // startAnimating(5);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <canvas id="canvas" width="400" height="300" />
          <FPSStats />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
