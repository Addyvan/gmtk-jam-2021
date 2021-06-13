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

export function LerpAngle(start : number, end : number, amount : number) {
    let difference = Math.abs(end - start);
    if (difference > Math.PI)
    {
        // We need to add on to one of the values.
        if (end > start)
        {
            // We'll add it on to start...
            start += 2 * Math.PI;
        }
        else
        {
            // Add it on to end.
            end += 2 * Math.PI;
        }
    }

    // Interpolate it.
    let value = (start + ((end - start) * amount));

    // Wrap it..
    let rangeZero = 2 * Math.PI;

    if (value >= 0 && value <= 2 * Math.PI)
        return value;

    return value;
}

/**
 * Given a Vector3, return an array of integers
 * which can be used to access a voxel in the
 * voxelGrid
 */
export function groupToGrid(pos : THREE.Vector3) {

    let i = Math.round(pos.x);
    let j = Math.round(pos.y);
    let k = Math.round(pos.z);


    return [i, j, k];

}
