import { Note, PianoChord } from "./note";

// create a color from a given note

export function getChordColor(chord: PianoChord) {
    // for now just like get the "root" chord? E.G. the first one...
    let notes = Object.keys(chord).map(key => parseInt(key));
    if (notes && notes.length >= 1) {
        return getNoteColor(notes[0]);
    }

    return "transparent";
}

export function getNoteColor(note: Note) {
    return getColor(note % 12);
}

export function getColor(index: number) {
    const colors = [
        "rgb(151,27,147)",
        "rgb(81,35,205)",
        "rgb(0,48,255)",
        "rgb(0,147,147)",
        "rgb(0,249,0)",
        "rgb(203,250,0)",
        "rgb(255,251,0)",
        "rgb(255,200,0)",
        "rgb(255,148,0)",
        "rgb(255,79,0)",
        "rgb(255,33,0)",
        "rgb(217,28,82)",
    ];

    return colors[index];
}