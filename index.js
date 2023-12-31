import { FreeCamera } from "@babylonjs/core";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import "@babylonjs/loaders/glTF";
import "@babylonjs/inspector";

import { initializeScene } from "./src/scene";
import buildSpheres from "./src/spheres";
import render from "./src/render";
import wrist from "./src/wrist";

const initialize = async () => {
  const canvas = document.querySelector("#canvas");
  const video = document.querySelector("#video");
  if (!video || !canvas) return;

  // Setup our scene

  const scene = initializeScene(canvas);
  const viewport = scene.activeCamera;
  viewport.position.z = -100;

  const landMarkPoints = 21;

  const [spheresLeft, spheresRight] = buildSpheres(scene, landMarkPoints);

  const wristAttachments = wrist(scene);

  /** Locate Hand tracking ML Trained model */
  const hands = new Hands({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
  });

  /** Settings for our MediaPipe hand tracking model */
  hands.setOptions({
    selfieMode: true,
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  /** This is our AR Camera that will render camera on <video> element */
  let camera = new Camera(video, {
    onFrame: async () => await hands.send({ image: video }),
    width: window.innerWidth,
    height: window.innerHeight,
    facingMode: "environment",
  });

  camera.start();

  hands.onResults((result) =>
    render({
      canvas,
      video,
      result,
      spheresLeft,
      spheresRight,
      landMarkPoints,
      viewport,
      wristAttachments,
    })
  );
};

window.onload = initialize;
