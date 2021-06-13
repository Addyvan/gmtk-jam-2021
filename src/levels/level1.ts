import * as THREE from "three";
import Level from "./levelInterface";

const level1 : Level = {
    passScore: 1,
    color: 0xd600ff,
    time: 22.5,
    shapes: [ 
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(0,0,-40),
            time: 5,
            speed: 1,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(-6,0,-40),
            time: 10,
            speed: 1,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(5,0,-40),
            time: 16,
            speed: 1.5,
            spawned: false
        },
    ],
    reference: [
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(0,0,1),
        new THREE.Vector3(0,0,2),
        new THREE.Vector3(0,0,3),
    ],
};

export default level1;
