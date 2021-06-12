import * as THREE from "three";

export interface Sphere {
    radius: number;
    center: THREE.Vector3;
}

function sphere_sphere(sphereA : Sphere, sphereB : Sphere) : boolean {
    
    let d = sphereA.center.distanceTo(sphereB.center);

    return (d < (sphereA.radius + sphereB.radius));
}

export default sphere_sphere;
