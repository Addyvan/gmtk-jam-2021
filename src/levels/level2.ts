import * as THREE from "three";
import Level from "./levelInterface";

const level2 : Level = {
    passScore: 1,
    color: 0xd600ff,
    time: 16.5,
    shapes: [
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(1,0,-40),
            time: 3,
            speed: 1,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(-1,0,-40),
            time: 6,
            speed: 1,
            spawned: false
        },
    ],
    reference: [
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(1,0,0),
        new THREE.Vector3(1,0,1),
    ],
};

export default level2;
