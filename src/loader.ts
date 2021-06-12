import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

import {radians} from "./utils";

class Loader {
    gltfLoader : GLTFLoader;
    svgLoader : SVGLoader;
    models : any;
    logo : any;

    constructor() {
        this.gltfLoader = new GLTFLoader();
        this.svgLoader = new SVGLoader();

        this.models = {};
        this.logo = undefined;

    }

    get(name : string) {
        return this.models[name];
    }

    load(name : string) {
        let self = this;

        this.gltfLoader.load( `assets/${name}`, ( gltf : any ) => {

            self.models[name] = {
                mixer: undefined,
                gltf: gltf
            };

        } );
    }

}

export default Loader;
