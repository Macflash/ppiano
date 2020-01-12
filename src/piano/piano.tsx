import React from 'react';
import { PianoChord, Note } from '../notes/note';

/** Piano Bed Component */
export const Piano: React.FC<PianoProps> = props => {
    const { onNoteClicked, flex, chord , color} = props;
    const baseNote = 60; // Middle C. This is hack and should be adjustable
    const octaves = 2;
    const steps: Key[] = ["W", "B", "W", "B", "W", "W", "B", "W", "B", "W", "B", "W"];

    const keys = React.useMemo(() => {
        const bed: any[] = [];
        const bedLength = steps.filter(s => s === "W").length * octaves;
        for (let i = 0; i < octaves; i++) {
            bed.push(...steps.map((key, k) => {
                let note: Note = baseNote + (i * 12) + k;
                return <PianoKey key={note} selectedColor={color} note={note} keyType={key} width={bedLength} selected={chord?.[note]} onNoteClicked={onNoteClicked} />
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

/** Piano Key Component */
export const PianoKey: React.FC<PianoKeyProps> = props => {
    const { note, keyType, selected, onNoteClicked, width, selectedColor } = props;

    const onClick = React.useCallback(() => { onNoteClicked?.([note]) }, [note, onNoteClicked]);

    const onDragStart = React.useCallback<GameDragEvent>(ev => {
        ev.persist();
        ev.dataTransfer.setData("text/plain", note.toString());
        ev.dataTransfer.dropEffect = "move";
    }, [note]);

    const onDrop = React.useCallback((ev: React.DragEvent<HTMLDivElement>) => {
        ev.persist();
        ev.preventDefault();
        ev.stopPropagation();
        const dropppedNote = parseInt(ev.dataTransfer.getData("text/plain"));
        if (dropppedNote !== note) {
            onNoteClicked?.([note, dropppedNote]);
        }
    }, [note, onNoteClicked]);

    const style = React.useMemo(() => ({
        width: keyType === "W" ? `calc(${100 / width}%)` : `calc(${50 / width}%)`,
        backgroundColor: selected ? (selectedColor || "lightblue") : (keyType === "W" ? "white" : "black"),
        border: "2px solid black",
        zIndex: keyType === "W" ? 2 : 3,
        marginRight: keyType === "W" ? -2 : `calc(-${25 / width}% - 1.5px)`,
        marginLeft: keyType === "W" ? undefined : `calc(-${25 / width}% - 1.5px)`,
        height: keyType === "W" ? "100%" : "65%",
    }), [width, keyType, selected]);

    return <div
        key={note}
        className="pianoKey"
        style={style}
        onClick={onClick}
        draggable={!!onNoteClicked}
        onDragStart={onDragStart}
        onDragOver={onDragOverMovableArea}
        onDrop={onDrop}
    ></div>
}

export type GameDragEvent = (ev: React.DragEvent<HTMLDivElement>) => void;

export const onDragOverMovableArea = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}

export type onNoteClicked = (notes: Note[]) => void;

export type Key = "W" | "B";

export interface PianoKeyProps {
    selectedColor?: string;
    note: Note;
    keyType: Key;
    selected?: boolean;
    onNoteClicked?: onNoteClicked;
    width: number;
}

export interface PianoProps {
    color?: string;
    chord?: PianoChord;
    onNoteClicked?: onNoteClicked;
    flex?: "none" | "auto";
}