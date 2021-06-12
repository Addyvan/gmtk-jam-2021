import * as THREE from "three";
import {Sphere} from "./sphere-sphere";

function box_sphere(box : THREE.Box3, sphere : Sphere) {

    let q : THREE.Vector3 = sphere.center.clone();
    if (q.x <= box.min.x){
        q.x = box.min.x
    } else if (q.x >= box.max.x){
        q.x = box.max.x
    }
    if (q.y <= box.min.y){
        q.y = box.min.y
    } else if (q.x >= box.max.y){
        q.y = box.max.y
    }
    if (q.z <= box.min.z){
        q.z = box.min.z
    } else if (q.z >= box.max.z){
        q.z = box.max.z
    }
    let d = sphere.center.distanceTo(q);

    return (d < sphere.radius);
}

export default box_sphere;

