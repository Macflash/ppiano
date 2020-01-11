import { Note } from "../notes/note";

export interface Instrument {
    playSound(note: Note): void
}

export const playPiano = (note: Note) => {
    let sound = Pfft;
    switch (note) {
        case 60:
            sound = C3_Piano;
            break;
        case 61:
            sound = Db3_Piano;
            break;
        case 62:
            sound = D3_Piano;
            break;
        case 63:
            sound = Eb3_Piano;
            break;
        case 64:
            sound = E3_Piano;
            break;
        case 65:
            sound = F3_Piano;
            break;
        case 66:
            sound = Gb3_Piano;
            break;
        case 67:
            sound = G3_Piano;
            break;
        case 68:
            sound = Ab3_Piano;
            break;
        case 69:
            sound = A3_Piano;
            break;
        case 70:
            sound = Bb3_Piano;
            break;
        case 71:
            sound = B3_Piano;
            break;
    }

    playSound(sound);
}

export const playSound = (sound: any) => {
    var audio = new Audio(sound);
    audio.volume = .5;
    audio.play();
}

// MISC
const Oops = require("./Misc/Oops.wav");
const Pfft = require("./Misc/Fart.wav");

// PIANO
const C3_Piano = require("./Piano/C3_Piano.wav");
const Db3_Piano = require("./Piano/Db3_Piano.wav");
const D3_Piano = require("./Piano/D3_Piano.wav");
const Eb3_Piano = require("./Piano/Eb3_Piano.wav");
const E3_Piano = require("./Piano/E3_Piano.wav");
const F3_Piano = require("./Piano/F3_Piano.wav");
const Gb3_Piano = require("./Piano/Gb3_Piano.wav");
const G3_Piano = require("./Piano/G3_Piano.wav");
const Ab3_Piano = require("./Piano/Ab3_Piano.wav");
const A3_Piano = require("./Piano/A3_Piano.wav");
const Bb3_Piano = require("./Piano/Bb3_Piano.wav");
const B3_Piano = require("./Piano/B3_Piano.wav");
