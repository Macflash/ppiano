import React from 'react';
import { PianoChord } from '../notes/note';
import { Piano } from './piano';
import { playPiano } from '../sounds/playSound';

export const SimpleClickerPiano: React.FC = () => {
    const [chord, setChord] = React.useState<PianoChord>({});
    return (
        <Piano chord={chord} onNoteClicked={note => {
            playPiano(note);
            setChord({ ...chord, [note]: !chord[note] })}
        } />
    );
}