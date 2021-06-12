import * as THREE from "three";
import player from "./player";

export function sleep(ms : number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const radians = (degrees : number) => {
    return degrees * (Math.PI / 180);
}

export function groupToWorld( pos : THREE.Vector3 ) : THREE.Vector3 {
    
    let p = pos.clone();

    const e = new THREE.Euler( player.rotation.x, player.rotation.y, player.rotation.z, 'XYZ' );
    p.applyEuler(e);
    
    p.x += player.position.x;
    p.y += player.position.y;
    p.z += player.position.z;

    return p;
}

export function worldToGroup( pos : THREE.Vector3 ) : THREE.Vector3 {
    let q = new THREE.Quaternion();
    let p = pos.clone();

    p.x -= player.position.x;
    p.y -= player.position.y;
    p.z -= player.position.z;

    const e = new THREE.Euler( player.rotation.x, player.rotation.y, player.rotation.z, 'XYZ' );
    q.setFromEuler(e);

    q.invert();
    p.applyQuaternion(q);

    return p;
}
