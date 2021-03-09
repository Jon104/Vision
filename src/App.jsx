import "./App.css";
import React from "react";
import { connect } from "react-redux";
import View from "./components/View";
import FPSStats from "react-fps-stats";
import { startAcquisition, stopAcquisition } from "./actions";
import { execute } from "./services/webgl";

var timer;

const App = (props) => {
  const initialViews = [
    { id: "canvas1", width: 800, height: 200 },
    { id: "canvas2", width: 800, height: 200 },
  ];

  const onStartAcquisition = () => (timer = setInterval(execute, 13));
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
