import React from 'react';
import { PianoChord, Note } from '../notes/note';

type Key = "W" | "B";

export const Piano: React.FC<{ chord?: PianoChord, onNoteClicked?: (note: Note) => void, flex?: "none" | "auto" }> = props => {
    const { onNoteClicked, flex, chord } = props;
    const baseNote = 60; // Middle C. This is hack and should be adjustable
    const octaves = 2;
    const steps: Key[] = ["W", "B", "W", "B", "W", "W", "B", "W", "B", "W", "B", "W"];

    const keys = React.useMemo(() => {
        const bed: any[] = [];
        const bedLength = steps.filter(s => s === "W").length * octaves;
        for (let i = 0; i < octaves; i++) {
            bed.push(...steps.map((key, k) => {
                let note: Note = baseNote + (i * 12) + k;
                return <PianoKey note={note} keyType={key} width={bedLength} selected={chord?.[note]} onNoteClicked={onNoteClicked} />
            }));
        }

        return bed;
    }, [chord, onNoteClicked]);

    const style = React.useMemo<React.CSSProperties>(() => ({
        display: "flex",
        flexDirection: "row",
        padding: 15,
        justifyContent: "center",
        height: "20vw",
        minHeight: "50px",
        flex: flex || "none"
    }), [flex])

    return <div style={style}>
        {keys}
    </div>
}

export const PianoKey: React.FC<{ note: Note, keyType: Key, selected?: boolean, onNoteClicked?: (note: Note) => void, width: number }> = props => {
    const { note, keyType, selected, onNoteClicked, width } = props;

    const onClick = React.useCallback(() => { onNoteClicked?.(note) }, [note, onNoteClicked]);

    const style = React.useMemo(() => ({
        width: keyType === "W" ? `calc(${100 / width}%)` : `calc(${50 / width}%)`,
        backgroundColor: selected ? "lightblue" : (keyType === "W" ? "white" : "black"),
        border: "2px solid black",
        zIndex: keyType === "W" ? 2 : 3,
        marginRight: keyType === "W" ? -2 : `calc(-${25 / width}% - 1.5px)`,
        marginLeft: keyType === "W" ? undefined : `calc(-${25 / width}% - 1.5px)`,
        height: keyType === "W" ? "100%" : "65%",
    }), [width, keyType, selected]);

    return <div key={note} className="pianoKey" style={style} onClick={onClick}></div>
}