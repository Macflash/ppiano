import React, { useState } from 'react';
import { PianoChord, lookupChord, standardize, getNoteName } from '../notes/note';
import { Piano, onNoteClicked } from './piano';
import { playNote, playChord } from '../sounds/playSound';
import { getChordColor } from '../notes/colors';

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

        // if multiple notes, we should only do DRAG action.
        // EG the start is selected, the end is NOT selected, then switch
        // otherwise NO change to initial
        if(notes.length == 2){
            // order is TARGET then initial
            if(newChord[notes[1]] && !newChord[notes[0]]){
                // switch then
                playNote(notes[0]);
                newChord[notes[0]] = true;
                delete newChord[notes[1]];
            }
            else{
                // just play the notes
                playNote(notes[0]);
                playNote(notes[1]);
            }
        }
        // all other cases just toggle each note!
        else {
            notes.forEach(note => {
                newChord[note] = !chord[note];
                if (!chord[note]) playNote(note);
                else delete newChord[note];
            });
        }
        

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

const PianoBed: React.FC<{
    index: number,
    chord: PianoChord,
    setChordAtIndex: (index: number, newChord: PianoChord) => void,
    deleteChordAtIndex: (index: number) => void,
}> = props => {
    const { index, chord, setChordAtIndex, deleteChordAtIndex } = props;
    const deleteChord = React.useCallback(() => deleteChordAtIndex(index), [deleteChordAtIndex, index]);
    const setChord = React.useCallback((newChord: PianoChord) => setChordAtIndex(index, newChord), [setChordAtIndex, index]);
    const { noteClick, play, reset } = useChordEvents(chord, setChord);
    return (
        <div
            key={index}
            style={{
                display: "flex",
                flexDirection: "row",
                border: "1px solid black",
                backgroundColor: getChordColor(chord)
            }}
        >
            <Piano flex="auto" chord={chord} onNoteClicked={noteClick} color={getChordColor(chord)}/>
            <div style={{ width: 80, display: "flex", flexDirection: "column", justifyContent: "center", flex: "none", paddingRight: 10 }}>
                <button onClick={play}>Play</button>
                <button onClick={reset}>Reset</button>
                <button onClick={deleteChord}>Delete</button>
                <b>
                    {standardize(chord).map(getNoteName).join(", ")}<br />
                    {lookupChord(chord).join(", ")}
                </b>
            </div>
        </div>
    );
}

export const PianoProgression: React.FC = props => {
    const [chords, setChords] = React.useState<PianoChord[]>([{}]);

    const deleteChordAtIndex = React.useCallback((index: number) => {
        setChords(currentChords => {
            let newChords = [...currentChords];
            newChords.splice(index, 1);
            return newChords;
        })
    }, [setChords]);

    const setChordAtIndex = React.useCallback((index: number, newChord: PianoChord) => {
        setChords(currentChords => {
            let newChords = [...currentChords];
            newChords[index] = newChord;
            return newChords;
        })
    }, [setChords]);

    return <>
        <div style={{ border: "1px solid black" }}>
            {chords.map((chord, index) => <PianoBed key={index} index={index} chord={chord} setChordAtIndex={setChordAtIndex} deleteChordAtIndex={deleteChordAtIndex} />)}
        </div>
        <div>
            <button onClick={() => { setChords(c => ([...c, {}])) }}>Add chord</button>
        </div>
    </>;
}