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
        case 72:
            sound = C4_Piano;
            break;
        case 73:
            sound = Db4_Piano;
            break;
        case 74:
            sound = D4_Piano;
            break;
        case 75:
            sound = Eb4_Piano;
            break;
        case 76:
            sound = E4_Piano;
            break;
        case 77:
            sound = F4_Piano;
            break;
        case 78:
            sound = Gb4_Piano;
            break;
        case 79:
            sound = G4_Piano;
            break;
        case 80:
            sound = Ab4_Piano;
            break;
        case 81:
            sound = A4_Piano;
            break;
        case 82:
            sound = Bb4_Piano;
            break;
        case 83:
            sound = B4_Piano;
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

const C4_Piano = require("./Piano/C4_Piano.wav");
const Db4_Piano = require("./Piano/Db4_Piano.wav");
const D4_Piano = require("./Piano/D4_Piano.wav");
const Eb4_Piano = require("./Piano/Eb4_Piano.wav");
const E4_Piano = require("./Piano/E4_Piano.wav");
const F4_Piano = require("./Piano/F4_Piano.wav");
const Gb4_Piano = require("./Piano/Gb4_Piano.wav");
const G4_Piano = require("./Piano/G4_Piano.wav");
const Ab4_Piano = require("./Piano/Ab4_Piano.wav");
const A4_Piano = require("./Piano/A4_Piano.wav");
const Bb4_Piano = require("./Piano/Bb4_Piano.wav");
const B4_Piano = require("./Piano/B4_Piano.wav");