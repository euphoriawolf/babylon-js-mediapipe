import { Matrix, Vector3 } from "@babylonjs/core";

/**
 * Render function is called at highest possible speed after MediaPipe hand tracking model finish it's calculation.
 */
const render = ({
  canvas,
  video,
  result,
  spheresLeft,
  spheresRight,
  landMarkPoints,
  viewport,
  wristAttachments,
}) => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  for (let i = 0; i < landMarkPoints; i++) {
    spheresLeft[i].isVisible = false;
    spheresRight[i].isVisible = false;
  }

  if (!result || !result.multiHandLandmarks.length) return;

  for (let hand = 0; hand < result.multiHandLandmarks.length; hand++) {
    const wrist = result.multiHandLandmarks[hand][0];
    const wristFactor = wrist.z;

    for (let i = 0; i < landMarkPoints; i++) {
      const coords = {
        x:
          video.videoWidth -
          result.multiHandLandmarks[hand][0].x * video.videoWidth,
        y: result.multiHandLandmarks[hand][0].y * video.videoHeight,
        z: result.multiHandLandmarks[hand][0].z * wristFactor,
      };

      const vector = Vector3.Unproject(
        new Vector3(coords.x, coords.y, 1),
        video.videoWidth,
        video.videoHeight,
        Matrix.Identity(),
        viewport.getViewMatrix(),
        viewport.getProjectionMatrix()
      );

      if (result.multiHandedness[hand].label == "Right") {
        // spheresRight[0].isVisible = true;
        // spheresRight[0].position.x = vector.x / 100;
        // spheresRight[0].position.y = vector.y / 100;
        wristAttachments.position.x = vector.x / 100;
        wristAttachments.position.y = vector.y / 100;
      } else {
        // We substract from projection camera height
        spheresLeft[0].isVisible = true;
        spheresLeft[0].position.x = vector.x / 100;
        spheresLeft[0].position.y = vector.y / 100;

        //spheresLeft[i].position.z = vector.z;
      }
    }
  }
};

export default render;
