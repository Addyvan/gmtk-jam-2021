import bl from "blengine";
import * as THREE from "three";
import ecs, {Signature, System} from "blecs";

// TODO:
// Loop through a scripted list of 
// shapes to send to the player for 
// a given thing to build 
// ex
//
// let shapes = [
//     {
//         type: "box",
//         size: new THREE.Vector3(...),
//         spawnPoint: new THREE.Vector3(...)
//     }
// ]

// speed component might be nice
let geometry : any ;
const spawn = ({dt, entities} : any) => {
    
    // 2% spawn rate per frame
    if (Math.random() > 0.99) {
        let e = ecs.CreateEntity();
        if (Math.random() < 0.5){  
            geometry = new THREE.SphereGeometry(0.5);
        } else {
            geometry = new THREE.BoxGeometry();
        }
        const material = new THREE.MeshPhongMaterial( { color: Math.random() * 0xffffff } );
        const shape = new THREE.Mesh( geometry, material );

        shape.position.set( (Math.random() -0.5) * 20, 0.5 +  Math.random(), Math.random() * 10 - 80);

        bl.scene.add(shape);

        ecs.AddComponent(e, "shape", shape);
    }

}

const SpawnSystem = new System(spawn);
let sig = new Signature();
ecs.RegisterSystem("spawnSystem", SpawnSystem);
ecs.SetSystemSignature("spawnSystem", sig);

export default SpawnSystem;
