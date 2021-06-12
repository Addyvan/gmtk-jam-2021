import * as THREE from "three";

function createLights( scene : THREE.Scene) {
    const dirLight2 = new THREE.DirectionalLight( 0xffffff, .5 );
    dirLight2.position.set( - 150, 75, - 150 );
    scene.add( dirLight2 );

    const ambientLight = new THREE.AmbientLight( 0xffffff, 1.25 ); // soft white light
    scene.add( ambientLight );
}

export default createLights;
