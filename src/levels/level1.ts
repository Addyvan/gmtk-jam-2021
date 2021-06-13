import * as THREE from "three";
import Level from "./levelInterface";

const level1 : Level = {
    passScore: 1,
    time: 15,
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
            location: new THREE.Vector3(0,0,-40),
            time: 8,
            speed: 1,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(0,0,-40),
            time: 10,
            speed: 3,
            spawned: false
        },
    ],
    reference: [
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(1,0,0),
        new THREE.Vector3(2,0,0),
        new THREE.Vector3(2,0,1),
    ],
};

export default level1;
