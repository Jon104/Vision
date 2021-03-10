import "./App.css";
import React, { useState } from "react";
import { connect } from "react-redux";
import View from "./components/View";
import FPSStats from "react-fps-stats";
import { startAcquisition, stopAcquisition } from "./actions";
import { execute } from "./services/webgl";
import ParticleField from "react-particles-webgl";

var timer;

const App = (props) => {
  const initialViews = [
    { id: "canvas1", width: 800, height: 200 },
    { id: "canvas2", width: 800, height: 200 },
  ];
  const [isParticlesEnabled, setIsParticlesEnabled] = useState(false);

  const onStartAcquisition = () => (timer = setInterval(execute, 13));
  const onStopAcquisition = () => clearInterval(timer);
  const onParticlesClick = () => setIsParticlesEnabled(!isParticlesEnabled);

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
          <button type="button" onClick={onParticlesClick}>
            {!isParticlesEnabled ? "Add 3D" : "Remove 3D"}
          </button>
        </div>
        <FPSStats />
      </header>
      {initialViews.map((view) => (
        <View
          key={view.id}
          id={view.id}
          width={view.width}
          height={view.height}
        />
      ))}
      {isParticlesEnabled && (
        <div className="put-behind fullscreen">
          <ParticleField />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { views } = state.App;
  return {
    views,
  };
};

export default connect(mapStateToProps, {
  startAcquisition,
  stopAcquisition,
})(App);
