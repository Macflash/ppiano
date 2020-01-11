// Notes are just a number, like midi but can be float
// Middle C is 60 (C3)

export type Note = number;

export type PianoChord = { [note: number]: boolean };

// Don't really need this yet:
export type Chord = Note[];