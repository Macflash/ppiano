import React from 'react';

type Key = "W" | "B";

export const Piano: React.FC = props => {
    const octaves = 2;
    const steps: Key[] = ["W", "B", "W", "B", "W", "W", "B", "W", "B", "W", "B", "W"];
    const bed: any[] = [];
    const whiteNum = steps.filter(s => s==="W").length * octaves;
    for (let i = 0; i < octaves; i++) {
        bed.push(...steps.map((step, k) => <div
            key={`${i},${k}`}
            style={{
                width: step === "W" ? `calc(${100 / whiteNum}%)` : `calc(${50 / whiteNum}%)`,
                backgroundColor: step === "W" ? "white" : "black",
                border: "1px solid black",
                zIndex: step === "W" ? 2 : 3,
                marginRight: step === "W" ? -1 : `calc(-${25 / whiteNum}% - 1px)`,
                marginLeft: step === "W" ? undefined : `calc(-${25 / whiteNum}% - 1px)`,
                height: step === "W" ? 150 : 100,
            }}></div>));
    }

    return <div style={{ display: "flex", flexDirection: "row", padding: 15, justifyContent: "center" }}>
        {bed}
    </div>
}