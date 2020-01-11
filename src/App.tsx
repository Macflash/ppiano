import React from 'react';
import { Piano } from './piano/piano';

const App: React.FC = () => {
  return (
    <div className="App">
      <Piano />
      <Piano />
      <Piano />
    </div>
  );
}

export default App;
