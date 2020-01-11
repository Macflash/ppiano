import React from 'react';
import { PianoChord, CommonChords, chordsAreEqual, lookupChord, standardize, getNoteName, Chord } from '../notes/note';
import { Piano, onNoteClicked } from './piano';
import { playNote, playChord } from '../sounds/playSound';

function usePianoChord(): [PianoChord, onNoteClicked, React.Dispatch<React.SetStateAction<PianoChord>>] {
    const [chord, setChord] = React.useState<PianoChord>({});
    const noteClicked = React.useCallback<onNoteClicked>(notes => {
        let newChord = { ...chord };
        notes.forEach(note => {
            newChord[note] = !chord[note];
            if (!chord[note]) playNote(note);
            else delete newChord[note];
        });

        setChord(newChord);
    }, [setChord, chord]);

    return [chord, noteClicked, setChord];
}

export const SimpleClickerPiano: React.FC = () => {
    const [chord, noteClicked] = usePianoChord();

    return (
        <Piano chord={chord} onNoteClicked={noteClicked} />
    );
}


export const SimpleClickerPianoIdentifier: React.FC = () => {
    const [chord, noteClicked, setChord] = usePianoChord();
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <Piano flex="auto" chord={chord} onNoteClicked={noteClicked} />
            <div style={{ width: 80, display: "flex", flexDirection: "column", justifyContent: "center", flex: "none", paddingRight: 10 }}>
                <button onClick={() => playChord(chord)}>Play</button>
                <button onClick={() => setChord({})}>Reset</button>
                {standardize(chord).map(getNoteName).join(", ")}<br />
                {lookupChord(chord).join(", ")}
            </div>
        </div>
    );
}