import React from 'react';
import { PianoChord, CommonChords, chordsAreEqual, lookupChord, standardize } from '../notes/note';
import { Piano } from './piano';
import { playPiano } from '../sounds/playSound';

export const SimpleClickerPiano: React.FC = () => {
    const [chord, setChord] = React.useState<PianoChord>({});
    return (
        <Piano chord={chord} onNoteClicked={note => {
            !chord[note] && playPiano(note);
            let newChord = { ...chord, [note]: !chord[note] };
            if (chord[note]) {
                delete newChord[note];
            }
            setChord(newChord);
        }} />
    );
}


export const SimpleClickerPianoIdentifier: React.FC = () => {
    const [chord, setChord] = React.useState<PianoChord>({});
    // if it matches any common chords
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <Piano flex="auto" chord={chord} onNoteClicked={note => {
                !chord[note] && playPiano(note);
                let newChord = { ...chord, [note]: !chord[note] };
                if (chord[note]) {
                    delete newChord[note];
                }
                setChord(newChord);
            }} />
            <div style={{ minWidth: 80, display: "flex", flexDirection: "column", justifyContent: "center", flex: "none", paddingRight: 10 }}>
                <button onClick={() => setChord({})}>Reset</button>
                {standardize(chord).join(", ")}<br />
                {lookupChord(chord).join(", ")}
            </div>
        </div>
    );
}