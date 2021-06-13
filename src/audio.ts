/// @ts-nocheck
import {Howl} from 'howler';

let tracks = [
    "song",
    "collide"
];

class AudioManager {

    sounds : any;

    constructor() {
        this.sounds = {};

        for (let i = 0; i < tracks.length; i++) {
            this.loadSound(tracks[i]);
        }

    }

    loadSound(track : string) {
        this.sounds[track] = new Howl({
            src: [`audio/${track}.wav`],
            volume: (track === "song") ? 0.25 : 1.5 ,
            loop: (track === "song") ? true : false,
            autoplay: false
        });

        if (track === "song") {
            this.sounds[track].play();
        }
    }

    stopTrack(track : string) {
        this.sounds[track].stop();
    }

    startTrack(track : string) {
        this.sounds[track].play();
    }


}


export default AudioManager;
