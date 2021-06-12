import loader from "../loader";
import {sleep} from "../utils";

import {initGameState} from "../states/GameState";
import {initPreviewState} from "../states/PreviewState";
import {initScoreScreenState} from "../states/ScoreScreenState";

let ASSETS = [
    // "floor.glb",
    "level1.glb"
];

async function loadModels() {
    for (let i = 0; i < ASSETS.length; i++) {
        loader.load(ASSETS[i]);
    }

    while (true) {

        
        let allLoaded : boolean = true;
        for (let i = 0; i < ASSETS.length; i++) {
            if (loader.models[ASSETS[i]] === undefined) {
                allLoaded = false;
            }
        }

        if (allLoaded) {
            break;
        }
        

        await sleep(50);
    }


    initGameState();
    initPreviewState();
    initScoreScreenState();

}

export default loadModels;
