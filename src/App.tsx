import React from 'react';
import { Piano } from './piano/piano';

const App: React.FC = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", height: "100%", width: "100%", position: "absolute", top: 0, bottom: 0, left: 0, right: 0}}>
      <Piano />
      <Piano />
      <Piano />
      <Piano />
      <Piano />
    </div>
  );
}

export default App;
