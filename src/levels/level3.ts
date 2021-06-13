import * as THREE from "three";
import Level from "./levelInterface";

const level3 : Level = {
    passScore: 1,
    color: 0xd600ff,
    time: 20,
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
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(2,0,-40),
            time: 10,
            speed: 1.25,
            spawned: false
        },
    ],
    reference: [
        new THREE.Vector3(1,0,0),
        new THREE.Vector3(2,0,0),
        new THREE.Vector3(2,1,0),
        new THREE.Vector3(3,0,0),
    ],
};

export default level3;
