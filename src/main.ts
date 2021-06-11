import * as THREE from "three";
import bl from "blengine";
import ecs, {Signature, System} from "blecs";
import CollisionSystem from "./systems/CollisionSystem";


function main() {

    bl.camera.position.z = 10;
    bl.camera.position.y = 5;

    
    let e = ecs.CreateEntity();

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial( { color: Math.random() * 0xff0000 } );
    const cube = new THREE.Mesh( geometry, material );

    bl.scene.add(cube);

    cube.position.set(0, 0, 0);

    bl.camera.lookAt(0,0,0);

    const dirLight2 = new THREE.DirectionalLight( 0xffffff, .5 );
    dirLight2.position.set( - 150, 75, - 150 );
    bl.scene.add( dirLight2 );

    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.75 ); // soft white light
    bl.scene.add( ambientLight );



    ecs.AddComponent(e, "shape", cube);

    const cube2 = new THREE.Mesh( geometry, material );
    cube.position.set(2, 0, 0);

    e = ecs.CreateEntity();
    
    ecs.AddComponent(e, "shape", cube2);
    

    update();
}

const cubes = ({dt, entities} : any) => {
    entities.forEach((entityID : number) => {
        let cube = ecs.GetComponent(entityID, "shape");
      
        if (bl.controls.GetKey("d")) {
            cube.position.x += dt * 10;
        }
    
        if (bl.controls.GetKey("a")) {
            cube.position.x -= dt * 10;
        }

    });
}

const CubesSystem = new System(cubes);


let sig = new Signature();
// "subscribe" to entities which have a position component
sig.set(ecs.GetComponentType("shape"), 1);
ecs.RegisterSystem("cubesSystem", CubesSystem);
ecs.SetSystemSignature("cubesSystem", sig);

function update() {

    requestAnimationFrame( () => update() );
    let dt : number = bl.clock.getDelta();

    

    CubesSystem.update(dt);
    CollisionSystem.update(dt);

    bl.renderer.render(bl.scene, bl.camera);

}

export default main;
