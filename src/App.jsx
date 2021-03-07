import "./App.css";
import React from "react";
import { connect } from "react-redux";
import View from "./components/View";
import FPSStats from "react-fps-stats";
import { startAcquisition, stopAcquisition } from "./actions";

const ViewTest = React.forwardRef((props, ref) => (
  <View ref={ref} {...props} />
));

const App = (props) => {
  const { startAcquisition, stopAcquisition } = props;
  const views = [
    { id: "canvas1", width: 800, height: 200 },
    { id: "canvas2", width: 800, height: 200 },
  ];

  const onStartAcquisition = () => startAcquisition();
  const onStopAcquisition = () => stopAcquisition();

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
      {views.map((view) => (
        <ViewTest
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
  return {};
};

export default connect(mapStateToProps, {
  startAcquisition,
  stopAcquisition,
})(App);
