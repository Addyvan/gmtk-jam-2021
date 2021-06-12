import * as THREE from "three";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

function renderText(t : string, p : THREE.Vector3, scale : number, scene : THREE.Scene | THREE.Group, container : any, key : string) {
    const floader = new THREE.FontLoader();
    const font = floader.load(
        // resource URL
        'fonts/KenneyHigh_Regular.json',

        // onLoad callback
        function ( font : any ) {
            

            const color = new THREE.Color( 0xffffff );

            const matDark = new THREE.MeshBasicMaterial( {
                color: color,
                side: THREE.DoubleSide
            } );

            const matLite = new THREE.MeshBasicMaterial( {
                color: color,
                transparent: true,
                opacity: 1,
                side: THREE.DoubleSide
            } );

            const message = t;

            const shapes = font.generateShapes( message, 100 );

            const geometry : any = new THREE.ShapeGeometry( shapes );

            geometry.computeBoundingBox();

            const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

            geometry.translate( xMid, 0, 0 );

            // make shape ( N.B. edge view not visible )

            const text = new THREE.Mesh( geometry, matLite );
            // text.position.z ;

            text.position.set(p.x, p.y, p.z);
            text.scale.set(scale, scale, scale);
            scene.add( text );

            container[key] = text;

            // make line shape ( N.B. edge view remains visible )

            const holeShapes = [];

            for ( let i = 0; i < shapes.length; i ++ ) {

                const shape = shapes[ i ];

                if ( shape.holes && shape.holes.length > 0 ) {

                    for ( let j = 0; j < shape.holes.length; j ++ ) {

                        const hole = shape.holes[ j ];
                        holeShapes.push( hole );

                    }

                }

            }

            shapes.push.apply( shapes, holeShapes );

            const style = SVGLoader.getStrokeStyle( 5, color.getStyle() );

            const strokeText = new THREE.Group();

            for ( let i = 0; i < shapes.length; i ++ ) {

                const shape = shapes[ i ];

                const points = shape.getPoints();

                const geometry = SVGLoader.pointsToStroke( points, style );

                geometry.translate( xMid, 0, 0 );

                const strokeMesh = new THREE.Mesh( geometry, matDark );
                strokeText.add( strokeMesh );

            }
            
        },

        // onProgress callback
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },

        // onError callback
        function ( err ) {
            console.error( 'An error happened', err );
        }
    );
}

export default renderText;