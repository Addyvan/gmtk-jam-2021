import player from "./player";

export function sleep(ms : number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const radians = (degrees : number) => {
    return degrees * (Math.PI / 180);
}

export function groupToWorld( pos : THREE.Vector3 ) : THREE.Vector3 {
    let p = pos.clone();
    p.x += player.position.x;
    p.y += player.position.y;
    p.z += player.position.z;
    return pos;
}

export function worldToGroup( pos : THREE.Vector3 ) : THREE.Vector3 {

    let p = pos.clone();
    p.x -= player.position.x;
    p.y -= player.position.y;
    p.z -= player.position.z;

    return p;
}
