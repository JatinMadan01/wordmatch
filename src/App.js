import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import ConfigPanel from './components/ConfigPanel';
import ResetButton from './components/ResetButton';
import './App.css';

const App = () => {
  const [config, setConfig] = useState({ groupSize: 2, itemCount: 8, columns: 4 });
  const [resetKey, setResetKey] = useState(0);

  const handleConfigChange = (newConfig) => setConfig(newConfig);

  const handleReset = () => setResetKey(prevKey => prevKey + 1);

  return (
    <div className="app">
      <h1>Word Connect</h1>
      <ConfigPanel config={config} onConfigChange={handleConfigChange} />
      <ResetButton onReset={handleReset} />
      <GameBoard config={config} key={resetKey} />
    </div>
  );
};

export default App;
