import * as THREE from "three";

function createGrid( scene : THREE.Scene) {
    let geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial( { 
        vertexColors: true, 
        morphTargets: true,
        linewidth: 1.5,
        fog: true
    } );



    for (let i = -5; i < 5; i++) {

        const positions = [];
        const colors = [];
        positions.push( 1, 0.5, 50 );
        positions.push( 1, 0.5, 40 );
        positions.push( 1, 0.5, 30 );
        positions.push( 1, 0.5, 20 );
        positions.push( 1, 0.5, 10 );
        positions.push( 1, 0.5, 0 );
        positions.push( 1, 0.5, -10 );
        positions.push( 1, 0.5, -20 );
        positions.push( 1, 0.5, -30 );
        positions.push( 1, 0.5, -32.5 );

        for (let k = 0; k < 10; k++) {

            if (k > 3) {
                colors.push(0);
                colors.push(255);
                colors.push(159);
            } else {
                colors.push(0);
                colors.push(255);
                colors.push(159);
            }
            

        }

        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
        geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

        let line = new THREE.Line( geometry, material );
        line.layers.enable(0);
        line.layers.disable(1);
        line.position.x = i * 2;
        scene.add( line );

    }
    geometry = new THREE.BufferGeometry();
    for (let i = -10; i < 5; i++) {

        const positions = [];
        const colors = [];
        positions.push( -9, 0.5, 0 );
        positions.push( 9, 0.5, 0 );
        
        

        for (let k = 0; k < 2; k++) {

            if (k > 3) {
                colors.push(0);
                colors.push(255);
                colors.push(159);
            } else {
                colors.push(0);
                colors.push(255);
                colors.push(159);
            }
            

        }

        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
        geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

        let line = new THREE.Line( geometry, material );
        line.layers.enable(0);
        line.layers.disable(1);
        line.position.z = i * 3;
        scene.add( line );

    }



}

export default createGrid;
