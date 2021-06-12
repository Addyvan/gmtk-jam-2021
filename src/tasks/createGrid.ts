import * as THREE from "three";

function createGrid( scene : THREE.Scene) {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial( { 
        vertexColors: true, 
        morphTargets: true,
        linewidth: 3
    } );

    for (let i = -5; i < 5; i++) {

        const positions = [];
        const colors = [];
        positions.push( 0, 0.5, 0 );
        positions.push( 0, 0.5, -10 );
        positions.push( 0, 0.5, -20 );
        positions.push( 0, 0.5, -30 );
        positions.push( 0, 0.5, -40 );
        positions.push( 0, 0.5, -50 );
        positions.push( 0, 0.5, -60 );
        positions.push( 0, 0.5, -70 );
        positions.push( 0, 0.5, -80 );
        positions.push( 0, 0.5, -90 );

        for (let k = 0; k < 10; k++) {

            
            colors.push(0);
            colors.push(255);
            colors.push(159);
            

        }

        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
        geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

        let line = new THREE.Line( geometry, material );
        line.position.x = i * 2;
        scene.add( line );

    }



}

export default createGrid;
