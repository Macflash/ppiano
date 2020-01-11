import React from 'react';
import { PianoChord } from '../notes/note';
import { Piano } from './piano';
import { playPiano } from '../sounds/playSound';

export const SimpleClickerPiano: React.FC = () => {
    const [chord, setChord] = React.useState<PianoChord>({});
    return (
        <Piano chord={chord} onNoteClicked={note => {
            !chord[note] && playPiano(note);
            setChord({ ...chord, [note]: !chord[note] })
        }
        } />
    );
}


export const SimpleClickerPianoIdentifier: React.FC = () => {
    const [chord, setChord] = React.useState<PianoChord>({});
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <Piano flex="auto" chord={chord} onNoteClicked={note => {
                !chord[note] && playPiano(note);
                setChord({ ...chord, [note]: !chord[note] })
            }
            } />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: "none", paddingRight: 10 }}>
                <button onClick={() => setChord({})} > Reset</button>
            </div>
        </div>
    );
}