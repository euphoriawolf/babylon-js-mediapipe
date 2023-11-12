import { MeshBuilder, TransformNode } from "babylonjs";
import * as BABYLON from "babylonjs";

const wristAttachments = (scene) => {
  const attachments = new BABYLON.TransformNode("attachments", scene);

  const wristOccluder = MeshBuilder.CreateCylinder(
    "cylinder",
    { diameter: 20, height: 20 },
    scene
  );

  wristOccluder.parent = attachments;
  return attachments;
};

export default wristAttachments;
