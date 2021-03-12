import "./App.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import View from "./components/View";
import FPSStats from "react-fps-stats";
import { startAcquisition, stopAcquisition } from "./actions";
import { execute } from "./services/webgl";
import ParticleField from "react-particles-webgl";
import Draggable from "react-draggable";
import { getColor } from "./services/utils";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

var timer;

const App = (props) => {
  const initialViews = [
    {
      id: "canvas1",
      type: "ascan",
      rulers: { vertical: "amp", horizontal: "ultrasound" },
      width: 800,
      height: 200,
    },
    {
      id: "canvas2",
      type: "sectorial",
      rulers: { vertical: "ultrasound", horizontal: "amp" },
      width: 800,
      height: 200,
    },
  ];
  const [isParticlesEnabled, setIsParticlesEnabled] = useState(false);

  const onStartAcquisition = () => (timer = requestAnimationFrame(execute));
  const onStopAcquisition = () => clearInterval(timer);
  const onParticlesClick = () => setIsParticlesEnabled(!isParticlesEnabled);

  useEffect(() => init());

  let camera, scene, renderer;
  let geometry, material, mesh;

  const init = () => {
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 1;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    material = new THREE.MeshNormalMaterial({ color: 0x00ff00 });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(400, 400);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);
  };

  const animation = (time) => {
    mesh.rotation.y = time / 7000;

    renderer.render(scene, camera);
  };

  return (
    <div class="container">
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
          <View id={view.id} width={view.width} height={view.height} />
        </div>
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
