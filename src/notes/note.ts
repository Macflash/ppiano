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
const minorSecond = 1;
const majorSecond = 2;
const minorThird = 3;
const majorThird = 4;
const fourth = 5;
const diminishedFifth = 6;
const augmentedFourth = diminishedFifth;
const tritone = diminishedFifth;
const fifth = 7;
const minorSixth = 8;
const majorSixth = 9;
const minorSeventh = 10;
const majorSeventh = 11;
const octave = 12;

function createChord(type: string, root: Note, intervals: Interval[]): NamedChord {
    return {
        name: `${getNoteName(root)} ${type}`,
        chord: standardize([root, ...intervals.map(i => root + i)])
    }
}

// TRIADS
export function MajorChord(root: Note): NamedChord {
    return createChord("maj", root, [majorThird, fifth]);
}

export function MinorChord(root: Note): NamedChord {
    return createChord("min", root, [minorThird, fifth]);
}

export function DiminishedChord(root: Note): NamedChord {
    return createChord("dim", root, [minorThird, diminishedFifth]);
}

// QUADS
// Sevenths

export function DominantSevenChord(root: Note): NamedChord {
    return createChord("dom7", root, [majorThird, fifth, minorSeventh]);
}

export function MinorSevenChord(root: Note): NamedChord {
    return createChord("min7", root, [minorThird, fifth, minorSeventh]);
}

export function MajorSevenChord(root: Note): NamedChord {
    return createChord("maj7", root, [majorThird, fifth, majorSeventh]);
}

export function MinorMajorSevenChord(root: Note): NamedChord {
    return createChord("minmaj7", root, [minorThird, fifth, majorSeventh]);
}

// Sixths

export function MajorSixthChord(root: Note): NamedChord {
    return createChord("6", root, [majorThird, fifth, majorSixth]);
}

export function MinorSixthChord(root: Note): NamedChord {
    return createChord("min6", root, [minorThird, fifth, majorSixth]);
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
    const notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    return notes[note % 12];
}

export const CommonChords: NamedChord[] = [];
for (let i = 0; i < 12; i++) {
    CommonChords.push(MajorChord(i));
    CommonChords.push(MinorChord(i));
    CommonChords.push(DiminishedChord(i));
    CommonChords.push(DominantSevenChord(i));
    CommonChords.push(MinorSevenChord(i));
    CommonChords.push(MajorSevenChord(i));
    CommonChords.push(MinorMajorSevenChord(i));
    CommonChords.push(MinorSixthChord(i));
    CommonChords.push(MajorSixthChord(i));
}
console.log(CommonChords);