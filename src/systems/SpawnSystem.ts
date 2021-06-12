import bl from "blengine";
import * as THREE from "three";
import ecs, {Signature, System} from "blecs";

import level1 from "../levels/level1";

import gameManager from "../GameManager";

interface ShapeSpawn {
    type: string;
    spec: any;
    location: THREE.Vector3;
    time: number;
    spawned: boolean;
}
let geometry : any;
// speed component might be nice
const spawn = ({dt, entities} : any) => {

    let l = gameManager.currentLevel;

    l.shapes.forEach((s : any) => {

        if (gameManager.timer.time > s.time && !(s.spawned)) {
            switch(s.type) {
                case "sphere": {
                    geometry = new THREE.SphereGeometry(s.spec.radius);
                } break;
                case "cube": {
                    geometry = new THREE.BoxGeometry(s.spec.width,s.spec.height);
                } break;
            }

            s.spawned = true;

            const material = new THREE.MeshPhongMaterial( { color: Math.random() * 0xffffff } );
            const shape = new THREE.Mesh( geometry, material );
            shape.position.set( s.location.x, s.location.y, s.location.z );
            
            bl.scene.add(shape);
            ecs.AddComponent(ecs.CreateEntity(), "shape", shape);

        }
        
    });
    
    
}

const SpawnSystem = new System(spawn);
let sig = new Signature();
ecs.RegisterSystem("spawnSystem", SpawnSystem);
ecs.SetSystemSignature("spawnSystem", sig);

export default SpawnSystem;
