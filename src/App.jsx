import "./App.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Views from "./components/Views";
import FPSStats from "react-fps-stats";
import { startAcquisition, stopAcquisition } from "./actions";
import { execute } from "./services/webgl";
import ParticleField from "react-particles-webgl";
import * as THREE from "three";

var timer;
var websocket;

const App = (props) => {
  const [isParticlesEnabled, setIsParticlesEnabled] = useState(false);

  const onStartAcquisition = () => websocket.send(JSON.stringify({ method: "START_ACQUISITION" }));
  const onStopAcquisition = () => clearInterval(timer);
  const onParticlesClick = () => setIsParticlesEnabled(!isParticlesEnabled);

  const connectToCPU = () => {
    websocket = new WebSocket('ws://localhost:8003')
    websocket.binaryType = "arraybuffer";
    websocket.addEventListener('open', function(event) {
      console.log('openned')
    })
    websocket.addEventListener('message', function(event) {
      let data = JSON.parse(event.data)
      execute(data.a)
    })
  }

  useEffect(() => {
    init()     
    connectToCPU()
  });

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

    geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    material = new THREE.MeshNormalMaterial({ color: 0x00ff00 });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(400, 400);
    renderer.setAnimationLoop(animation);
    document.getElementById("3d").appendChild(renderer.domElement);
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
      <Views />
      <div id="3d" />
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
