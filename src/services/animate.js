let stop = false;
let frameCount = 0;
let then;
let fpsInterval;
let startTime;

// initialize the timer variables and start the animation

export const startAnimating = (fps) => {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
};

function animate() {
  // request another frame

  requestAnimationFrame(animate);

  // calc elapsed time since last loop

  const now = Date.now();
  const elapsed = now - then;

  // if enough time has elapsed, draw the next frame

  if (elapsed > fpsInterval) {
    // Get ready for next frame by setting then=now, but also adjust for your
    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    then = now - (elapsed % fpsInterval);

    // TESTING...Report #seconds since start and achieved fps.
    var sinceStart = now - startTime;
    var currentFps =
      Math.round((1000 / (sinceStart / ++frameCount)) * 100) / 100;
    console.log(
      "Elapsed time= " +
        Math.round((sinceStart / 1000) * 100) / 100 +
        " secs @ " +
        currentFps +
        " fps."
    );
    // Put your drawing code here
  }
}
