import React from 'react';
import { PianoChord, Note } from '../notes/note';

type Key = "W" | "B";

export const Piano: React.FC<{ chord?: PianoChord, onNoteClicked?: (note: Note) => void }> = props => {
    const baseNote = 60; // Middle C. This is hack and should be adjustable
    const octaves = 2;
    const steps: Key[] = ["W", "B", "W", "B", "W", "W", "B", "W", "B", "W", "B", "W"];
    const bed: any[] = [];
    const whiteNum = steps.filter(s => s === "W").length * octaves;
    for (let i = 0; i < octaves; i++) {
        bed.push(...steps.map((step, k) => {
            let backgroundColor = step === "W" ? "white" : "black";
            let note: Note = baseNote + (i * 12) + k;
            if (props.chord?.[note]) {
                backgroundColor = "lightblue";
            }

            return <div
                onClick={() => props.onNoteClicked?.(note)}
                key={`${i},${k}`}
                style={{
                    width: step === "W" ? `calc(${100 / whiteNum}%)` : `calc(${50 / whiteNum}%)`,
                    backgroundColor,
                    border: "2px solid black",
                    zIndex: step === "W" ? 2 : 3,
                    marginRight: step === "W" ? -2 : `calc(-${25 / whiteNum}% - 1.5px)`,
                    marginLeft: step === "W" ? undefined : `calc(-${25 / whiteNum}% - 1.5px)`,
                    height: step === "W" ? "100%" : "65%",
                }}></div>
        }));
    }

    return <div style={{ display: "flex", flexDirection: "row", padding: 15, justifyContent: "center", height: "20vw", minHeight: "50px", flex: "none" }}>
        {bed}
    </div>
}