import * as _ from "lodash";

// Notes are just a number, like midi but can be float
// Middle C is 60 (C3)

export type Note = number;

export type PianoChord = { [note: number]: boolean };

// Don't really need this yet:
export type Chord = Note[];

export type Interval = number;
const minorThird = 4;
const majorThird = 5;
const fifth = 7;

export function upMajorThird(note: Note): Note {
    return note + majorThird;
}

export function upFifth(note: Note): Note {
    return note + fifth;
}

export function MajorChord(root: Note): Chord {
    return [root, upMajorThird(root), upFifth(root)];
}

export function toPianoChord(chord: Chord): PianoChord {
    const pianoChord: PianoChord = {};
    chord.forEach(note => pianoChord[note] = true);
    return pianoChord;
}

export function chordsAreEqual(pianoChord: PianoChord, chord: Chord): boolean {
    const otherChord = toPianoChord(chord);
    return _.isEqual(pianoChord, otherChord);
}