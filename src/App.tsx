import React from 'react';
import { Piano } from './piano/piano';
import { PianoChord } from './notes/note';
import { SimpleClickerPiano, SimpleClickerPianoIdentifier } from './piano/simpleClickerPiano';

const App: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
      <SimpleClickerPianoIdentifier />
      <SimpleClickerPianoIdentifier />
      <SimpleClickerPianoIdentifier />
      <SimpleClickerPianoIdentifier />
      <SimpleClickerPianoIdentifier />
    </div>
  );
}

export default App;
