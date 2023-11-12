import { Mesh, MeshBuilder } from "@babylonjs/core";

/**
 * Build simple TUPLE with 2 arrays of 21 Spheres that we will place on each point later
 */
const buildSpheres = (scene, landMarkPoints) => {
  // Create our array of spheres
  const spheresLeft = [];
  const spheresRight = [];
  for (let i = 0; i < landMarkPoints; i++) {
    // We should use instances to hit better performance
    spheresLeft.push(
      MeshBuilder.CreateSphere("Sphere" + i, { diameter: 2 }, scene)
    );
    spheresRight.push(
      MeshBuilder.CreateSphere("Sphere" + i, { diameter: 2 }, scene)
    );
  }

  return [spheresLeft, spheresRight];
};

export default buildSpheres;
