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
            location: new THREE.Vector3(-1,0,-40),
            time: 2,
            speed: 1,
            spawned: false
        },
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
            location: new THREE.Vector3(1,0,-40),
            time: 4,
            speed: 1,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(1,0,-40),
            time: 7,
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
            time: 9,
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
            location: new THREE.Vector3(2,0,-40),
            time: 12,
            speed: 1.25,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(-2,0,-40),
            time: 15,
            speed: 1.25,
            spawned: false
        },
    ],
    reference: [
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(1,0,0),
        new THREE.Vector3(0,0,1),
        new THREE.Vector3(1,0,1),
        new THREE.Vector3(0,1,0),
        new THREE.Vector3(1,1,0),
        new THREE.Vector3(0,1,1),
        new THREE.Vector3(1,1,1),
    ],
};

export default level3;
