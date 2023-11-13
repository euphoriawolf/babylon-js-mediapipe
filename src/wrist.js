import { MeshBuilder, TransformNode, SceneLoader } from "babylonjs";
import * as BABYLON from "babylonjs";
import "@babylonjs/loaders";

const wristAttachments = (scene) => {
  const attachments = new BABYLON.TransformNode("attachments", scene);

  const wristOccluder = MeshBuilder.CreateCylinder(
    "cylinder",
    { diameter: 20, height: 20 },
    scene
  );

  //  Create a standard material for the occluder
  const occluderMaterial = new BABYLON.StandardMaterial(
    "occluderMaterial",
    scene
  );
  occluderMaterial.disableColorWrite = true;

  wristOccluder.material = occluderMaterial;

  wristOccluder.parent = attachments;

  SceneLoader.ImportMesh(
    "",
    "/src/",
    "scene.babylon",
    scene,
    function (meshes, particleSystems, skeletons) {
      // Success callback
      console.log("Meshes loaded successfully:", meshes);
      const model = meshes[0];
      //   console.log(model);
      model.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
      model.rotation = new BABYLON.Vector3(
        BABYLON.Tools.ToRadians(0),
        BABYLON.Tools.ToRadians(180),
        BABYLON.Tools.ToRadians(270)
      );
      model.position = new BABYLON.Vector3(15, 0, 0);

      model.parent = attachments;
    },
    function (event) {
      // Progress callback (optional)
      console.log("Loading progress:", event);
    },
    function (event) {
      // Additional information
      console.error("Event details:", event);
    }
  );

  return attachments;
};

export default wristAttachments;
