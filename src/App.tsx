import React from 'react';
import { Piano } from './piano/piano';
import { PianoChord } from './notes/note';
import { SimpleClickerPiano, SimpleClickerPianoIdentifier, PianoProgression } from './piano/simpleClickerPiano';

const appStyle: React.CSSProperties = { display: "flex", flexDirection: "column", height: "100%", width: "100%", position: "absolute", top: 0, bottom: 0, left: 0, right: 0 };

const App: React.FC = () => {
  return (
    <div style={appStyle}>
      <PianoProgression />
    </div>
  );
}

export default App;
