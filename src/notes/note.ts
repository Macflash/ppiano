import * as _ from "lodash";

// Notes are just a number, like midi but can be float
// Middle C is 60 (C3)

export type Note = number;

export type PianoChord = { [note: number]: boolean };

// Don't really need this yet:
export type Chord = Note[];
export interface NamedChord {
    name: string,
    chord: Chord,
}

export type Interval = number;
const minorThird = 3;
const majorThird = 4;
const fifth = 7;

export function upMinorThird(note: Note): Note {
    return note + minorThird;
}

export function upMajorThird(note: Note): Note {
    return note + majorThird;
}

export function upFifth(note: Note): Note {
    return note + fifth;
}

export function MajorChord(root: Note): NamedChord {
    return {
        name: `${getNoteName(root)} Major`,
        chord: standardize([root, upMajorThird(root), upFifth(root)])
    };
}

export function MinorChord(root: Note): NamedChord {
    return {
        name: `${getNoteName(root)} Minor`,
        chord: standardize([root, upMinorThird(root), upFifth(root)])
    };
}

export function toPianoChord(chord: Chord): PianoChord {
    const pianoChord: PianoChord = {};
    chord.forEach(note => pianoChord[note] = true);
    return pianoChord;
}

export function standardize(chord: PianoChord | Chord): Chord {
    let standardChord: Chord = chord as Chord;
    if ((chord as Chord).length == undefined) {
        standardChord = Object.keys(chord).map(note => parseInt(note) % 12);
    }

    return standardChord.map(note => note % 12).sort((a, b) => a - b);
}

export function IsEqual<T>(a: T, b: T): boolean {
    return _.isEqual(a, b);
}

export function chordsAreEqual(pianoChord: PianoChord, chord: Chord): boolean {
    return IsEqual(standardize(pianoChord), chord);
}

export function lookupChord(pianoChord: PianoChord | Chord) {
    let standardChord = standardize(pianoChord);
    const matchedChords = CommonChords.filter(otherChord => IsEqual(standardChord, otherChord.chord));
    return matchedChords.map(c => c.name);
}

export function getNoteName(note: Note) {
    switch (note % 12) {
        case 0:
            return "C";
        case 1:
            return "Db";
        case 2:
            return "D";
        case 3:
            return "Eb";
        case 4:
            return "E";
        case 5:
            return "F";
        case 6:
            return "Gb";
        case 7:
            return "G";
        case 8:
            return "Ab";
        case 9:
            return "A";
        case 10:
            return "B";
        case 11:
            return "Bb";
    }
}

export const CommonChords: NamedChord[] = [];
for (let i = 0; i < 12; i++) {
    CommonChords.push(MajorChord(i));
    CommonChords.push(MinorChord(i));
}
console.log(CommonChords);