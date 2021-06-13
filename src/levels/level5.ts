import * as THREE from "three";
import Level from "./levelInterface";

const level5 : Level = {
    passScore: 1,
    color: 0x0000ff,
    time: 23,
    shapes: [ 
        {
            time: 3,
            location: new THREE.Vector3(0,0,-40),
            speed: 5,
            type: "cube",
            spec: {width: 1,height: 1},
            spawned: false
        },
        {
            time: 4,
            location: new THREE.Vector3(0,0,-40),
            speed: 5,
            type: "cube",
            spec: {width: 1,height: 1},
            spawned: false
        },
        {
            time: 7,
            location: new THREE.Vector3(-3,1,-40),
            speed: 5,
            type: "cube",
            spec: {width: 1,height: 1},
            spawned: false
        },
        {
            time: 8,
            location: new THREE.Vector3(-3,1,-40),
            speed: 5,
            type: "cube",
            spec: {width: 1,height: 1},
            spawned: false
        },
        {
            time: 11,
            location: new THREE.Vector3(3,2,-40),
            speed: 5,
            type: "cube",
            spec: {width: 1,height: 1},
            spawned: false
        },
        {
            time: 12,
            location: new THREE.Vector3(3,2,-40),
            speed: 5,
            type: "cube",
            spec: {width: 1,height: 1},
            spawned: false
        },
        {
            time: 16,
            location: new THREE.Vector3(-3,3,-40),
            speed: 5,
            type: "cube",
            spec: {width: 1,height: 1},
            spawned: false
        },
        {
            time: 17,
            location: new THREE.Vector3(-3,3,-40),
            speed: 5,
            type: "cube",
            spec: {width: 1,height: 1},
            spawned: false
        },
       
    ],
    reference: [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(-1, 1, 0),
        new THREE.Vector3(-1, 2, 0),
        new THREE.Vector3(-2, 2, 0),
        new THREE.Vector3(-2, 3, 0),
        new THREE.Vector3(-3, 3, 0)
    ],
};

export default level5;
