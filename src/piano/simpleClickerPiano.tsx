import React, { useState } from 'react';
import { PianoChord, lookupChord, standardize, getNoteName } from '../notes/note';
import { Piano, onNoteClicked } from './piano';
import { playNote, playChord } from '../sounds/playSound';

function usePianoChord() {
    const [chord, setChord] = React.useState<PianoChord>({});
    return useChordEvents(chord, setChord);
}

type SetChord = (newChord: PianoChord) => void;
function useChordEvents(chord: PianoChord, setChord: SetChord) {
    const reset = React.useCallback(() => setChord({}), [setChord]);
    const play = React.useCallback(() => playChord(chord), [chord]);
    const noteClick = React.useCallback<onNoteClicked>(notes => {
        let newChord = { ...chord };
        notes.forEach(note => {
            newChord[note] = !chord[note];
            if (!chord[note]) playNote(note);
            else delete newChord[note];
        });

        setChord(newChord);
    }, [setChord, chord]);

    return { chord, noteClick, setChord, reset, play };
}

export const SimpleClickerPiano: React.FC = () => {
    const { chord, noteClick, setChord, reset, play } = usePianoChord();

    return (
        <Piano chord={chord} onNoteClicked={noteClick} />
    );
}

export const SimpleClickerPianoIdentifier: React.FC = () => {
    const { chord, noteClick, setChord, reset, play } = usePianoChord();

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <Piano flex="auto" chord={chord} onNoteClicked={noteClick} />
            <div style={{ width: 80, display: "flex", flexDirection: "column", justifyContent: "center", flex: "none", paddingRight: 10 }}>
                <button onClick={play}>Play</button>
                <button onClick={reset}>Reset</button>
                {standardize(chord).map(getNoteName).join(", ")}<br />
                {lookupChord(chord).join(", ")}
            </div>
        </div>
    );
}

const PianoBed: React.FC<{ index: number, chord: PianoChord, setChordAtIndex: (index: number, newChord: PianoChord) => void }> = props => {
    const { index, chord, setChordAtIndex } = props;
    const setChord = React.useCallback((newChord: PianoChord) => setChordAtIndex(index, newChord), [setChordAtIndex, index]);
    const { noteClick, play, reset } = useChordEvents(chord, setChord);
    return (
        <div key={index} style={{ display: "flex", flexDirection: "row" }}>
            <Piano flex="auto" chord={chord} onNoteClicked={noteClick} />
            <div style={{ width: 80, display: "flex", flexDirection: "column", justifyContent: "center", flex: "none", paddingRight: 10 }}>
                <button onClick={play}>Play</button>
                <button onClick={reset}>Reset</button>
                {standardize(chord).map(getNoteName).join(", ")}<br />
                {lookupChord(chord).join(", ")}
            </div>
        </div>
    );
}

export const PianoProgression: React.FC = props => {
    const [chords, setChords] = React.useState<PianoChord[]>([]);

    const setChordAtIndex = React.useCallback((index: number, newChord: PianoChord) => {
        setChords(currentChords => {
            let newChords = [...currentChords];
            newChords[index] = newChord;
            return newChords;
        })
    }, [setChords]);

    return <>
        {chords.map((chord, index) => <PianoBed key={index} index={index} chord={chord} setChordAtIndex={setChordAtIndex} />)}
        <div>
            <button onClick={() => { setChords(c => ([...c, {}])) }}>Add chord</button>
        </div>
    </>;
}